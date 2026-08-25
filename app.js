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
        this.sectionsState = {
            system: false, // Закрыт по умолчанию (стрелка вправо)
            user: false     // Закрыт по умолчанию (стрелка вправо)
        };
        
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
        this.settingsBtn = document.getElementById('settingsBtn');
        this.collapseBtn = document.getElementById('collapseBtn');
        this.expandBtn = document.getElementById('expandBtn');
        this.collapseIcon = document.getElementById('collapseIcon');
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
        this.settingsBtn.addEventListener('click', () => this.toggleSettings());
        this.themeToggle.addEventListener('change', () => this.toggleTheme());
        this.closeOfflineBtn.addEventListener('click', () => this.hideOfflineIndicator());
        this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        this.collapseBtn.addEventListener('click', () => this.collapseSidebar());
        this.expandBtn.addEventListener('click', () => this.expandSidebar());
        
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
    
    collapseSidebar() {
        this.isSidebarCollapsed = true;
        this.sidebar.classList.add('collapsed');
        this.collapseBtn.style.display = 'none';
        this.expandBtn.style.display = 'flex';
        
        // Закрываем мобильное меню если оно было открыто
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
    
    async installPwa
