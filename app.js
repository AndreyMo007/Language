class NotesApp {
    constructor() {
        this.themes = [];
        this.codeFiles = [];
        this.currentThemeId = null;
        this.currentFileId = null;
        this.autoSaveTimer = null;
        this.deferredPrompt = null;
        this.systemThemes = SystemNotes.getAllThemes();
        this.isDarkTheme = true;
        this.isOnline = navigator.onLine;
        this.connectionQuality = 'good';
        this.isSidebarOpen = false;
        this.isSidebarCollapsed = false;
        this.isSettingsOpen = false;
        this.sectionsState = {
            system: false,
            user: false,
            editor: false
        };
        
        this.initElements();
        this.loadThemePreference();
        this.checkInstallMode();
        this.loadThemes();
        this.loadCodeFiles();
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
        this.settingsBtn = document.getElementById('settingsBtn');
        this.collapseBtn = document.getElementById('collapseBtn');
        this.expandBtn = document.getElementById('expandBtn');
        this.collapseIcon = document.getElementById('collapseIcon');
        this.addThemeModal = document.getElementById('addThemeModal');
        this.addFileModal = document.getElementById('addFileModal');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.newThemeName = document.getElementById('newThemeName');
        this.newFileName = document.getElementById('newFileName');
        this.cancelAddTheme = document.getElementById('cancelAddTheme');
        this.confirmAddTheme = document.getElementById('confirmAddTheme');
        this.cancelAddFile = document.getElementById('cancelAddFile');
        this.confirmAddFile = document.getElementById('confirmAddFile');
        this.themeToggle = document.getElementById('themeToggle');
        this.offlineIndicator = document.getElementById('offlineIndicator');
        this.closeOfflineBtn = document.getElementById('closeOfflineBtn');
        this.connectionIndicator = document.getElementById('connectionIndicator');
        this.codeEditor = document.getElementById('codeEditor');
        this.codeTextarea = document.getElementById('codeTextarea');
        this.codeIframeMini = document.getElementById('codeIframeMini');
        this.codeIframeFull = document.getElementById('codeIframeFull');
        this.consoleOutputFull = document.getElementById('consoleOutputFull');
        this.runCodeBtn = document.getElementById('runCodeBtn');
        this.toggleOutputBtn = document.getElementById('toggleOutputBtn');
        this.codeOutputMini = document.getElementById('codeOutputMini');
        this.fullscreenOutput = document.getElementById('fullscreenOutput');
        this.closeFullscreenBtn = document.getElementById('closeFullscreenBtn');
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
        this.settingsBtn.addEventListener('click', () => this.toggleSettings());
        this.themeToggle.addEventListener('change', () => this.toggleTheme());
        this.closeOfflineBtn.addEventListener('click', () => this.hideOfflineIndicator());
        this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        this.collapseBtn.addEventListener('click', () => this.collapseSidebar());
        this.expandBtn.addEventListener('click', () => this.expandSidebar());
        
        // Редактор кода
        this.cancelAddFile.addEventListener('click', () => this.closeAddFileModal());
        this.confirmAddFile.addEventListener('click', () => this.addNewFile());
        this.runCodeBtn.addEventListener('click', () => this.runCode());
        this.toggleOutputBtn.addEventListener('click', () => this.toggleFullscreenOutput());
        this.closeFullscreenBtn.addEventListener('click', () => this.closeFullscreenOutput());
        
        this.addThemeModal.addEventListener('click', (e) => {
            if (e.target === this.addThemeModal) {
                this.closeAddThemeModal();
            }
        });
        
        this.addFileModal.addEventListener('click', (e) => {
            if (e.target === this.addFileModal) {
                this.closeAddFileModal();
            }
        });
        
        this.noteEditor.addEventListener('input', () => {
            this.startAutoSave();
        });
        
        this.codeTextarea.addEventListener('input', () => {
            this.saveCurrentFile();
        });
        
        this.newThemeName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewTheme();
            }
        });
        
        this.newFileName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewFile();
            }
        });
        
        window.addEventListener('beforeunload', () => {
            this.saveCurrentNote();
            this.saveCurrentFile();
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
    
    getFileExtension(filename) {
        const parts = filename.split('.');
        if (parts.length > 1) {
            return parts[parts.length - 1].toLowerCase();
        }
        return '';
    }
    
    runCode() {
        const code = this.codeTextarea.value;
        const fileName = this.currentFileId ? 
            this.codeFiles.find(f => f.id === this.currentFileId)?.name || 'index.html' : 
            'index.html';
        const extension = this.getFileExtension(fileName);
        
        // Очищаем консоль
        this.consoleOutputFull.innerHTML = '';
        
        // Перехватываем console.log
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.log = (...args) => {
            this.addConsoleMessage(args.join(' '), 'log');
            originalLog.apply(console, args);
        };
        
        console.error = (...args) => {
            this.addConsoleMessage(args.join(' '), 'error');
            originalError.apply(console, args);
        };
        
        console.warn = (...args) => {
            this.addConsoleMessage(args.join(' '), 'warn');
            originalWarn.apply(console, args);
        };
        
        try {
            if (extension === 'html' || extension === 'htm') {
                this.codeIframeMini.srcdoc = code;
                this.codeIframeFull.srcdoc = code;
            } else if (extension === 'css') {
                const fullHtml = `<!DOCTYPE html>
<html>
<head>
<style>${code}</style>
</head>
<body>
<div id="preview">CSS предпросмотр</div>
</body>
</html>`;
                this.codeIframeMini.srcdoc = fullHtml;
                this.codeIframeFull.srcdoc = fullHtml;
            } else if (extension === 'js') {
                const result = new Function(code)();
                if (result !== undefined) {
                    this.addConsoleMessage(String(result), 'log');
                }
                const fullHtml = `<!DOCTYPE html>
<html>
<body>
<div>JavaScript выполнен. Смотрите консоль.</div>
</body>
</html>`;
                this.codeIframeMini.srcdoc = fullHtml;
                this.codeIframeFull.srcdoc = fullHtml;
            } else {
                this.codeIframeMini.srcdoc = code;
                this.codeIframeFull.srcdoc = code;
            }
            
            // Показываем мини-вывод
            this.codeOutputMini.style.display = 'block';
        } catch (error) {
            this.addConsoleMessage(error.message, 'error');
        }
        
        // Восстанавливаем console
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
    }
    
    addConsoleMessage(message, type) {
        const msgElement = document.createElement('div');
        msgElement.className = `console-${type}`;
        msgElement.textContent = message;
        this.consoleOutputFull.appendChild(msgElement);
        this.consoleOutputFull.scrollTop = this.consoleOutputFull.scrollHeight;
    }
    
    toggleFullscreenOutput() {
        this.fullscreenOutput.style.display = 'flex';
        this.codeOutputMini.style.display = 'none';
    }
    
    closeFullscreenOutput() {
        this.fullscreenOutput.style.display = 'none';
        this.codeOutputMini.style.display = 'block';
    }
    
    toggleSettings() {
        this.isSettingsOpen = !this.isSettingsOpen;
        
        if (this.isSettingsOpen) {
            this.noteEditor.style.display = 'none';
            this.codeEditor.style.display = 'none';
            this.settingsPanel.style.display = 'block';
        } else {
            this.noteEditor.style.display = 'block';
            this.settingsPanel.style.display = 'none';
            if (this.currentFileId) {
                this.codeEditor.style.display = 'flex';
            }
        }
    }
    
    collapseSidebar() {
        this.isSidebarCollapsed = true;
        this.sidebar.classList.add('collapsed');
        this.collapseBtn.style.display = 'none';
        this.expandBtn.style.display = 'flex';
        
        if (window.innerWidth <= 768) {
            this.closeSidebar();
        }
    }
    
    expandSidebar() {
        this.isSidebarCollapsed = false;
        this.sidebar.classList.remove('collapsed');
        this.collapseBtn.style.display = 'flex';
        this.expandBtn.style.display = 'none';
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
    
    loadCodeFiles() {
        const savedFiles = localStorage.getItem('notesAppCodeFiles');
        if (savedFiles) {
            this.codeFiles = JSON.parse(savedFiles);
        }
    }
    
    saveCodeFiles() {
        localStorage.setItem('notesAppCodeFiles', JSON.stringify(this.codeFiles));
    }
    
    renderThemes() {
        this.themeList.innerHTML = '';
        
        // Системные темы (Конспекты)
        if (this.systemThemes.length > 0) {
            const systemHeader = document.createElement('div');
            systemHeader.className = 'theme-section-header';
            systemHeader.innerHTML = `
                <span>Конспекты</span>
                <div class="section-header-right">
                    <button class="section-toggle-btn" data-section="system">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 960'%3E%3Cpath fill='%23e0e0e0' d='M480 345 240 585l43 43 197-198 197 198 43-43z'/%3E%3C/svg%3E" alt="toggle" class="section-arrow ${this.sectionsState.system ? 'up' : 'down'}">
                    </button>
                </div>
            `;
            this.themeList.appendChild(systemHeader);
            
            if (this.sectionsState.system) {
                this.systemThemes.forEach(theme => {
                    this.renderThemeItem(theme, true);
                });
            }
        }
        
        // Пользовательские темы (Заметки)
        const userHeader = document.createElement('div');
        userHeader.className = 'theme-section-header';
        userHeader.innerHTML = `
            <span>Заметки</span>
            <div class="section-header-right">
                <button class="section-toggle-btn" data-section="user">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 960'%3E%3Cpath fill='%23e0e0e0' d='M480 345 240 585l43 43 197-198 197 198 43-43z'/%3E%3C/svg%3E" alt="toggle" class="section-arrow ${this.sectionsState.user ? 'up' : 'down'}">
                </button>
            </div>
        `;
        this.themeList.appendChild(userHeader);
        
        if (this.sectionsState.user) {
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
        
        // Секция Редактор
        const editorHeader = document.createElement('div');
        editorHeader.className = 'theme-section-header';
        editorHeader.innerHTML = `
            <span>Редактор</span>
            <div class="section-header-right">
                <button class="section-add-btn" id="addFileBtn" title="Добавить файл">+</button>
                <button class="section-toggle-btn" data-section="editor">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 960'%3E%3Cpath fill='%23e0e0e0' d='M480 345 240 585l43 43 197-198 197 198 43-43z'/%3E%3C/svg%3E" alt="toggle" class="section-arrow ${this.sectionsState.editor ? 'up' : 'down'}">
                </button>
            </div>
        `;
        this.themeList.appendChild(editorHeader);
        
        if (this.sectionsState.editor) {
            if (this.codeFiles.length > 0) {
                this.codeFiles.forEach(file => {
                    this.renderFileItem(file);
                });
            } else {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'Нет файлов';
                this.themeList.appendChild(emptyMessage);
            }
        }
        
        // Обработчики для кнопок секций
        document.querySelectorAll('.section-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const section = btn.dataset.section;
                this.toggleSection(section);
            });
        });
        
        document.querySelectorAll('.theme-section-header').forEach(header => {
            header.addEventListener('click', (e) => {
                if (e.target.closest('.section-toggle-btn') || e.target.closest('.section-add-btn')) return;
                const btn = header.querySelector('.section-toggle-btn');
                if (btn) {
                    const section = btn.dataset.section;
                    this.toggleSection(section);
                }
            });
        });
        
        // Обработчик для кнопки добавления файла
        const addFileBtn = document.getElementById('addFileBtn');
        if (addFileBtn) {
            addFileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openAddFileModal();
            });
        }
    }
    
    renderFileItem(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'theme-item';
        if (file.id === this.currentFileId) {
            fileItem.classList.add('active');
        }
        
        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-theme';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            this.deleteFile(file.id);
        };
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(deleteBtn);
        
        fileItem.onclick = () => {
            this.openFile(file.id);
            if (window.innerWidth <= 768) {
                this.closeSidebar();
            }
        };
        
        this.themeList.appendChild(fileItem);
    }
    
    toggleSection(section) {
        if (section === 'system') {
            this.sectionsState.system = !this.sectionsState.system;
        } else if (section === 'user') {
            this.sectionsState.user = !this.sectionsState.user;
        } else if (section === 'editor') {
            this.sectionsState.editor = !this.sectionsState.editor;
        }
        this.renderThemes();
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
    
    openAddFileModal() {
        this.addFileModal.classList.add('active');
        this.newFileName.value = '';
        this.newFileName.focus();
    }
    
    closeAddFileModal() {
        this.addFileModal.classList.remove('active');
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
    
    addNewFile() {
        const fileName = this.newFileName.value.trim();
        if (!fileName) {
            alert('Пожалуйста, введите название файла');
            return;
        }
        
        const newFile = {
            id: Date.now().toString(),
            name: fileName,
            content: ''
        };
        
        this.codeFiles.push(newFile);
        this.saveCodeFiles();
        this.renderThemes();
        this.openFile(newFile.id);
        this.closeAddFileModal();
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
    
    deleteFile(fileId) {
        if (!confirm('Удалить этот файл?')) {
            return;
        }
        
        this.codeFiles = this.codeFiles.filter(f => f.id !== fileId);
        this.saveCodeFiles();
        
        if (this.currentFileId === fileId) {
            this.currentFileId = null;
            this.codeEditor.style.display = 'none';
            this.noteEditor.style.display = 'block';
            this.currentThemeTitle.textContent = 'Выберите тему';
            this.saveNoteBtn.disabled = true;
        }
        
        this.renderThemes();
    }
    
    openTheme(themeId) {
        const systemTheme = SystemNotes.getThemeById(themeId);
        
        this.codeEditor.style.display = 'none';
        this.noteEditor.style.display = 'block';
        this.settingsPanel.style.display = 'none';
        this.isSettingsOpen = false;
        
        if (systemTheme) {
            this.saveCurrentNote();
            
            this.currentThemeId = themeId;
            this.currentFileId = null;
            this.currentThemeTitle.textContent = systemTheme.name;
            this.noteEditor.value = systemTheme.content || '';
            this.noteEditor.disabled = true;
            this.noteEditor.readOnly = true;
            this.saveNoteBtn.disabled = true;
            
            localStorage.setItem('notesAppLastTheme', themeId);
            this.renderThemes();
            return;
        }
        
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return;
        
        this.saveCurrentNote();
        
        this.currentThemeId = themeId;
        this.currentFileId = null;
        this.currentThemeTitle.textContent = theme.name;
        this.noteEditor.value = theme.content || '';
        this.noteEditor.disabled = false;
        this.noteEditor.readOnly = false;
        this.saveNoteBtn.disabled = false;
        this.noteEditor.focus();
        
        localStorage.setItem('notesAppLastTheme', themeId);
        this.renderThemes();
    }
    
    openFile(fileId) {
        const file = this.codeFiles.find(f => f.id === fileId);
        if (!file) return;
        
        this.saveCurrentNote();
        
        this.currentFileId = fileId;
        this.currentThemeId = null;
        this.currentThemeTitle.textContent = file.name;
        
        this.noteEditor.style.display = 'none';
        this.settingsPanel.style.display = 'none';
        this.codeEditor.style.display = 'flex';
        this.isSettingsOpen = false;
        
        this.codeTextarea.value = file.content || '';
        
        this.saveNoteBtn.disabled = true;
        
        this.renderThemes();
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
    
    saveCurrentFile() {
        if (!this.currentFileId) return;
        
        const file = this.codeFiles.find(f => f.id === this.currentFileId);
        if (file) {
            file.content = this.codeTextarea.value;
            this.saveCodeFiles();
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
