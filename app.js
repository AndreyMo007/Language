class NotesApp {
    constructor() {
        this.themes = [];
        this.currentThemeId = null;
        this.autoSaveTimer = null;
        this.deferredPrompt = null;
        this.systemThemes = SystemNotes.getAllThemes();
        this.isDarkTheme = true;
        this.isOnline = navigator.onLine;
        this.connectionQuality = 'good';
        this.isSidebarOpen = false;
        this.isSidebarCollapsed = false;
        this.isSettingsOpen = false;
        
        this.initElements();
        this.loadThemePreference();
        this.checkInstallMode();
        this.loadThemes();
        this.attachEventListeners();
        this.initServiceWorker();
        this.initConnectionMonitoring();
    }
    
    initElements() {
        this.installScreen = document.getElementById('installScreen');
        this.app = document.getElementById('app');
        this.installBtn = document.getElementById('installBtn');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.themeList = document.getElementById('themeList');
        this.noteEditor = document.getElementById('noteEditor');
        this.currentThemeTitle = document.getElementById('currentThemeTitle');
        this.addThemeBtn = document.getElementById('addThemeBtn');
        this.saveNoteBtn = document.getElementById('saveNoteBtn');
        this.menuToggle = document.getElementById('menuToggle');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.collapseBtn = document.getElementById('collapseBtn');
        this.collapseIcon = document.querySelector('.collapse-icon');
        this.addThemeModal = document.getElementById('addThemeModal');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.newThemeName = document.getElementById('newThemeName');
        this.cancelAddTheme = document.getElementById('cancelAddTheme');
        this.confirmAddTheme = document.getElementById('confirmAddTheme');
        this.themeToggle = document.getElementById('themeToggle');
        this.offlineIndicator = document.getElementById('offlineIndicator');
        this.closeOfflineBtn = document.getElementById('closeOfflineBtn');
        this.connectionIndicator = document.getElementById('connectionIndicator');
    }
    
    loadThemePreference() {
        const savedTheme = localStorage.getItem('notesAppTheme');
        if (savedTheme) {
            this.isDarkTheme = savedTheme === 'dark';
        }
        this.applyTheme();
    }
    
    applyTheme() {
        if (this.isDarkTheme) {
            document.body.classList.remove('light-theme');
            this.themeToggle.checked = true;
        } else {
            document.body.classList.add('light-theme');
            this.themeToggle.checked = false;
        }
        localStorage.setItem('notesAppTheme', this.isDarkTheme ? 'dark' : 'light');
    }
    
    checkInstallMode() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                          || window.navigator.standalone 
                          || document.referrer.includes('android-app://');
        
        if (isStandalone) {
            this.showApp();
        } else {
            this.showInstallScreen();
        }
        
        window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
            if (e.matches) {
                this.showApp();
            }
        });
    }
    
    showInstallScreen() {
        this.installScreen.style.display = 'flex';
        this.app.style.display = 'none';
    }
    
    showApp() {
        this.installScreen.style.display = 'none';
        this.app.style.display = 'flex';
        
        const lastThemeId = localStorage.getItem('notesAppLastTheme');
        if (lastThemeId) {
            if (SystemNotes.isSystemTheme(lastThemeId)) {
                this.openTheme(lastThemeId);
            } else if (this.themes.find(t => t.id === lastThemeId)) {
                this.openTheme(lastThemeId);
            }
        }
    }
    
    attachEventListeners() {
        this.installBtn.addEventListener('click', () => this.installPwa());
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.installBtn.style.display = 'block';
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('PWA установлено');
            this.deferredPrompt = null;
            this.showApp();
        });
        
        this.addThemeBtn.addEventListener('click', () => this.openAddThemeModal());
        this.cancelAddTheme.addEventListener('click', () => this.closeAddThemeModal());
        this.confirmAddTheme.addEventListener('click', () => this.addNewTheme());
        this.saveNoteBtn.addEventListener('click', () => this.saveCurrentNote());
        this.menuToggle.addEventListener('click', () => this.toggleSidebar());
        this.settingsBtn.addEventListener('click', () => this.toggleSettings());
        this.themeToggle.addEventListener('change', () => this.toggleTheme());
        this.closeOfflineBtn.addEventListener('click', () => this.hideOfflineIndicator());
        this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        this.collapseBtn.addEventListener('click', () => this.toggleCollapse());
        
        this.addThemeModal.addEventListener('click', (e) => {
            if (e.target === this.addThemeModal) {
                this.closeAddThemeModal();
            }
        });
        
        this.noteEditor.addEventListener('input', () => {
            this.startAutoSave();
        });
        
        this.newThemeName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewTheme();
            }
        });
        
        window.addEventListener('beforeunload', () => {
            this.saveCurrentNote();
        });
        
        // Обработка свайпов для мобильных
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    toggleSettings() {
        this.isSettingsOpen = !this.isSettingsOpen;
        
        if (this.isSettingsOpen) {
            this.noteEditor.style.display = 'none';
            this.settingsPanel.style.display = 'block';
        } else {
            this.noteEditor.style.display = 'block';
            this.settingsPanel.style.display = 'none';
        }
    }
    
    toggleCollapse() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        
        if (this.isSidebarCollapsed) {
            this.sidebar.classList.add('collapsed');
            this.collapseIcon.textContent = '▶';
            // Перемещаем кнопку в main-header
            const mainHeader = document.querySelector('.main-header');
            const menuToggle = document.getElementById('menuToggle');
            mainHeader.insertBefore(this.collapseBtn, menuToggle);
            this.collapseBtn.style.display = 'flex';
        } else {
            this.sidebar.classList.remove('collapsed');
            this.collapseIcon.textContent = '◀';
            // Возвращаем кнопку в sidebar
            const sidebarHeaderTop = document.querySelector('.sidebar-header-top');
            const h2 = sidebarHeaderTop.querySelector('h2');
            sidebarHeaderTop.insertBefore(this.collapseBtn, h2.nextSibling);
            this.collapseBtn.style.display = 'flex';
        }
        
        // Закрываем мобильное меню если оно было открыто
        if (window.innerWidth <= 768) {
            this.closeSidebar();
        }
    }
    
    handleSwipe(startX, endX) {
        const swipeDistance = endX - startX;
        const threshold = 100;
        
        if (Math.abs(swipeDistance) > threshold) {
            if (swipeDistance > 0 && startX < 50) {
                this.openSidebar();
            } else if (swipeDistance < 0 && this.isSidebarOpen) {
                this.closeSidebar();
            }
        }
    }
    
    initConnectionMonitoring() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.checkConnectionQuality();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.connectionQuality = 'offline';
            this.updateConnectionIndicator();
            this.showOfflineIndicator();
        });
        
        setInterval(() => {
            if (this.isOnline) {
                this.checkConnectionQuality();
            }
        }, 30000);
        
        this.updateConnectionIndicator();
    }
    
    checkConnectionQuality() {
        if (!this.isOnline) {
            this.connectionQuality = 'offline';
            this.updateConnectionIndicator();
            this.showOfflineIndicator();
            return;
        }
        
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            if (connection.effectiveType === '4g') {
                this.connectionQuality = 'good';
            } else if (connection.effectiveType === '3g' || connection.effectiveType === '2g') {
                this.connectionQuality = 'medium';
            } else if (connection.effectiveType === 'slow-2g') {
                this.connectionQuality = 'poor';
            } else {
                this.connectionQuality = 'good';
            }
        } else {
            this.testConnectionSpeed();
            return;
        }
        
        this.updateConnectionIndicator();
        this.updateOfflineIndicatorVisibility();
    }
    
    testConnectionSpeed() {
        const startTime = Date.now();
        fetch('https://www.google.com/favicon.ico', { 
            mode: 'no-cors',
            cache: 'no-store' 
        })
        .then(() => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            if (duration < 300) {
                this.connectionQuality = 'good';
            } else if (duration < 1000) {
                this.connectionQuality = 'medium';
            } else {
                this.connectionQuality = 'poor';
            }
            
            this.updateConnectionIndicator();
            this.updateOfflineIndicatorVisibility();
        })
        .catch(() => {
            this.connectionQuality = 'offline';
            this.isOnline = false;
            this.updateConnectionIndicator();
            this.showOfflineIndicator();
        });
    }
    
    updateConnectionIndicator() {
        this.connectionIndicator.className = 'connection-indicator';
        
        switch (this.connectionQuality) {
            case 'good':
                this.connectionIndicator.classList.add('online');
                this.connectionIndicator.title = 'Онлайн - отличное соединение';
                break;
            case 'medium':
                this.connectionIndicator.classList.add('medium');
                this.connectionIndicator.title = 'Среднее качество соединения';
                break;
            case 'poor':
                this.connectionIndicator.classList.add('poor');
                this.connectionIndicator.title = 'Плохое качество соединения';
                break;
            case 'offline':
                this.connectionIndicator.classList.add('offline');
                this.connectionIndicator.title = 'Оффлайн - нет соединения';
                break;
        }
    }
    
    updateOfflineIndicatorVisibility() {
        if (this.connectionQuality === 'offline') {
            this.showOfflineIndicator();
        } else {
            this.hideOfflineIndicator();
        }
    }
    
    showOfflineIndicator() {
        this.offlineIndicator.style.display = 'flex';
    }
    
    hideOfflineIndicator() {
        this.offlineIndicator.style.display = 'none';
    }
    
    async installPwa() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const result = await this.deferredPrompt.userChoice;
            console.log('Результат установки:', result.outcome);
            this.deferredPrompt = null;
        } else {
            alert('Нажмите кнопку "Поделиться" и выберите "На экран «Домой»"');
        }
    }
    
    loadThemes() {
        const savedThemes = localStorage.getItem('notesAppThemes');
        if (savedThemes) {
            this.themes = JSON.parse(savedThemes);
        }
        this.renderThemes();
    }
    
    saveThemes() {
        localStorage.setItem('notesAppThemes', JSON.stringify(this.themes));
    }
    
    renderThemes() {
        this.themeList.innerHTML = '';
        
        if (this.systemThemes.length > 0) {
            const systemHeader = document.createElement('div');
            systemHeader.className = 'theme-section-header';
            systemHeader.textContent = 'Конспекты';
            this.themeList.appendChild(systemHeader);
            
            this.systemThemes.forEach(theme => {
                this.renderThemeItem(theme, true);
            });
        }
        
        const userHeader = document.createElement('div');
        userHeader.className = 'theme-section-header';
        userHeader.textContent = 'Заметки';
        this.themeList.appendChild(userHeader);
        
        if (this.themes.length > 0) {
            this.themes.forEach(theme => {
                this.renderThemeItem(theme, false);
            });
        } else {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'Создайте первую заметку';
            this.themeList.appendChild(emptyMessage);
        }
    }
    
    renderThemeItem(theme, isSystem) {
        const themeItem = document.createElement('div');
        themeItem.className = 'theme-item';
        if (theme.id === this.currentThemeId) {
            themeItem.classList.add('active');
        }
        
        const themeName = document.createElement('span');
        themeName.textContent = theme.name;
        
        if (!isSystem) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-theme';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.deleteTheme(theme.id);
            };
            themeItem.appendChild(themeName);
            themeItem.appendChild(deleteBtn);
        } else {
            themeItem.appendChild(themeName);
        }
        
        themeItem.onclick = () => {
            this.openTheme(theme.id);
            if (window.innerWidth <= 768) {
                this.closeSidebar();
            }
        };
        
        this.themeList.appendChild(themeItem);
    }
    
    openAddThemeModal() {
        this.addThemeModal.classList.add('active');
        this.newThemeName.value = '';
        this.newThemeName.focus();
    }
    
    closeAddThemeModal() {
        this.addThemeModal.classList.remove('active');
    }
    
    toggleTheme() {
        this.isDarkTheme = this.themeToggle.checked;
        this.applyTheme();
    }
    
    addNewTheme() {
        const themeName = this.newThemeName.value.trim();
        if (!themeName) {
            alert('Пожалуйста, введите название заметки');
            return;
        }
        
        const newTheme = {
            id: Date.now().toString(),
            name: themeName,
            content: ''
        };
        
        this.themes.push(newTheme);
        this.saveThemes();
        this.renderThemes();
        this.openTheme(newTheme.id);
        this.closeAddThemeModal();
    }
    
    deleteTheme(themeId) {
        if (SystemNotes.isSystemTheme(themeId)) {
            alert('Системные конспекты нельзя удалить');
            return;
        }
        
        if (!confirm('Удалить эту заметку?')) {
            return;
        }
        
        this.themes = this.themes.filter(t => t.id !== themeId);
        this.saveThemes();
        
        if (this.currentThemeId === themeId) {
            this.currentThemeId = null;
            this.noteEditor.value = '';
            this.noteEditor.disabled = true;
            this.noteEditor.readOnly = false;
            this.currentThemeTitle.textContent = 'Выберите тему';
            this.saveNoteBtn.disabled = true;
            localStorage.removeItem('notesAppLastTheme');
        }
        
        this.renderThemes();
    }
    
    openTheme(themeId) {
        const systemTheme = SystemNotes.getThemeById(themeId);
        
        if (systemTheme) {
            this.saveCurrentNote();
            
            this.currentThemeId = themeId;
            this.currentThemeTitle.textContent = systemTheme.name;
            this.noteEditor.value = systemTheme.content || '';
            this.noteEditor.disabled = true;
            this.noteEditor.readOnly = true;
            this.saveNoteBtn.disabled = true;
            
            localStorage.setItem('notesAppLastTheme', themeId);
            this.renderThemes();
            
            // Закрываем настройки если открыты
            if (this.isSettingsOpen) {
                this.toggleSettings();
            }
            return;
        }
        
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return;
        
        this.saveCurrentNote();
        
        this.currentThemeId = themeId;
        this.currentThemeTitle.textContent = theme.name;
        this.noteEditor.value = theme.content || '';
        this.noteEditor.disabled = false;
        this.noteEditor.readOnly = false;
        this.saveNoteBtn.disabled = false;
        this.noteEditor.focus();
        
        localStorage.setItem('notesAppLastTheme', themeId);
        this.renderThemes();
        
        // Закрываем настройки если открыты
        if (this.isSettingsOpen) {
            this.toggleSettings();
        }
    }
    
    saveCurrentNote() {
        if (!this.currentThemeId) return;
        
        if (SystemNotes.isSystemTheme(this.currentThemeId)) {
            return;
        }
        
        const theme = this.themes.find(t => t.id === this.currentThemeId);
        if (theme) {
            theme.content = this.noteEditor.value;
            this.saveThemes();
            this.showSaveIndicator();
        }
    }
    
    startAutoSave() {
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => {
            this.saveCurrentNote();
        }, 1000);
    }
    
    showSaveIndicator() {
        this.saveNoteBtn.textContent = 'Сохранено';
        setTimeout(() => {
            this.saveNoteBtn.textContent = 'Сохранить';
        }, 2000);
    }
    
    toggleSidebar() {
        if (this.isSidebarOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }
    
    openSidebar() {
        this.sidebar.classList.add('open');
        this.sidebarOverlay.classList.add('active');
        this.isSidebarOpen = true;
    }
    
    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('active');
        this.isSidebarOpen = false;
    }
    
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js')
                    .then(registration => {
                        console.log('Service Worker зарегистрирован:', registration);
                    })
                    .catch(error => {
                        console.log('Ошибка регистрации Service Worker:', error);
                    });
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new NotesApp();
    window.app = app;
});
