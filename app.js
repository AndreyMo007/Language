class NotesApp {
    constructor() {
        this.themes = [];
        this.currentThemeId = null;
        this.autoSaveTimer = null;
        this.deferredPrompt = null;
        this.systemThemes = SystemNotes.getAllThemes();
        
        this.initElements();
        this.checkInstallMode();
        this.loadThemes();
        this.attachEventListeners();
        this.initServiceWorker();
    }
    
    initElements() {
        this.installScreen = document.getElementById('installScreen');
        this.app = document.getElementById('app');
        this.installBtn = document.getElementById('installBtn');
        this.sidebar = document.getElementById('sidebar');
        this.themeList = document.getElementById('themeList');
        this.noteEditor = document.getElementById('noteEditor');
        this.currentThemeTitle = document.getElementById('currentThemeTitle');
        this.addThemeBtn = document.getElementById('addThemeBtn');
        this.saveNoteBtn = document.getElementById('saveNoteBtn');
        this.menuToggle = document.getElementById('menuToggle');
        this.addThemeModal = document.getElementById('addThemeModal');
        this.newThemeName = document.getElementById('newThemeName');
        this.cancelAddTheme = document.getElementById('cancelAddTheme');
        this.confirmAddTheme = document.getElementById('confirmAddTheme');
    }
    
    checkInstallMode() {
        // Проверяем, запущено ли приложение как PWA
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                          || window.navigator.standalone 
                          || document.referrer.includes('android-app://');
        
        if (isStandalone) {
            this.showApp();
        } else {
            this.showInstallScreen();
        }
        
        // Слушаем изменения режима отображения
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
        
        // Открываем последнюю тему после показа приложения
        const lastThemeId = localStorage.getItem('notesAppLastTheme');
        if (lastThemeId) {
            // Проверяем, не системная ли это тема
            if (SystemNotes.isSystemTheme(lastThemeId)) {
                this.openTheme(lastThemeId);
            } else if (this.themes.find(t => t.id === lastThemeId)) {
                this.openTheme(lastThemeId);
            }
        }
    }
    
    attachEventListeners() {
        // Обработка установки PWA
        this.installBtn.addEventListener('click', () => this.installPwa());
        
        // Перехватываем событие beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.installBtn.style.display = 'block';
        });
        
        // Обработка успешной установки
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
        
        // Закрытие модального окна при клике вне его
        this.addThemeModal.addEventListener('click', (e) => {
            if (e.target === this.addThemeModal) {
                this.closeAddThemeModal();
            }
        });
        
        // Автосохранение при вводе
        this.noteEditor.addEventListener('input', () => {
            this.startAutoSave();
        });
        
        // Обработка Enter в модальном окне
        this.newThemeName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewTheme();
            }
        });
        
        // Сохранение перед закрытием
        window.addEventListener('beforeunload', () => {
            this.saveCurrentNote();
        });
    }
    
    async installPwa() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const result = await this.deferredPrompt.userChoice;
            console.log('Результат установки:', result.outcome);
            this.deferredPrompt = null;
        } else {
            // Fallback для iOS
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
        
        // Сначала показываем системные темы
        if (this.systemThemes.length > 0) {
            const systemHeader = document.createElement('div');
            systemHeader.className = 'theme-section-header';
            systemHeader.textContent = '📚 Системные конспекты';
            this.themeList.appendChild(systemHeader);
            
            this.systemThemes.forEach(theme => {
                this.renderThemeItem(theme, true);
            });
        }
        
        // Затем пользовательские темы
        const userHeader = document.createElement('div');
        userHeader.className = 'theme-section-header';
        userHeader.textContent = '📝 Мои темы';
        this.themeList.appendChild(userHeader);
        
        if (this.themes.length > 0) {
            this.themes.forEach(theme => {
                this.renderThemeItem(theme, false);
            });
        } else {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'Создайте первую тему';
            this.themeList.appendChild(emptyMessage);
        }
    }
    
    renderThemeItem(theme, isSystem) {
        const themeItem = document.createElement('div');
        themeItem.className = 'theme-item';
        if (theme.id === this.currentThemeId) {
            themeItem.classList.add('active');
        }
        if (isSystem) {
            themeItem.classList.add('system-theme');
        }
        
        const themeName = document.createElement('span');
        themeName.innerHTML = isSystem ? 
            `${theme.icon || '📖'} ${theme.name}` : 
            theme.name;
        
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
            const lockIcon = document.createElement('span');
            lockIcon.className = 'lock-icon';
            lockIcon.textContent = '🔒';
            themeItem.appendChild(themeName);
            themeItem.appendChild(lockIcon);
        }
        
        themeItem.onclick = () => this.openTheme(theme.id);
        
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
    
    addNewTheme() {
        const themeName = this.newThemeName.value.trim();
        if (!themeName) {
            alert('Пожалуйста, введите название темы');
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
        // Проверяем, не системная ли это тема
        if (SystemNotes.isSystemTheme(themeId)) {
            alert('Системные конспекты нельзя удалить');
            return;
        }
        
        if (!confirm('Удалить эту тему и все её конспекты?')) {
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
        // Проверяем, не системная ли это тема
        const systemTheme = SystemNotes.getThemeById(themeId);
        
        if (systemTheme) {
            this.saveCurrentNote();
            
            this.currentThemeId = themeId;
            this.currentThemeTitle.textContent = `${systemTheme.icon || ''} ${systemTheme.name}`;
            this.noteEditor.value = systemTheme.content || '';
            this.noteEditor.disabled = true;
            this.noteEditor.readOnly = true;
            this.saveNoteBtn.disabled = true;
            
            localStorage.setItem('notesAppLastTheme', themeId);
            this.renderThemes();
            
            // Закрываем боковое меню на мобильных
            if (window.innerWidth <= 768) {
                this.sidebar.classList.remove('open');
            }
            return;
        }
        
        // Обычная пользовательская тема
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
        
        // Закрываем боковое меню на мобильных
        if (window.innerWidth <= 768) {
            this.sidebar.classList.remove('open');
        }
    }
    
    saveCurrentNote() {
        if (!this.currentThemeId) return;
        
        // Проверяем, не системная ли это тема
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
        this.saveNoteBtn.textContent = '✓ Сохранено';
        setTimeout(() => {
            this.saveNoteBtn.textContent = '💾 Сохранить';
        }, 2000);
    }
    
    toggleSidebar() {
        this.sidebar.classList.toggle('open');
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

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    const app = new NotesApp();
    window.app = app;
});
