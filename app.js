class NotesApp {
    constructor() {
        this.themes = [];
        this.currentThemeId = null;
        this.autoSaveTimer = null;
        this.deferredPrompt = null;
        
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
        this.previewArea = document.getElementById('previewArea');
        this.toolbar = document.getElementById('toolbar');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFileInput = document.getElementById('importFileInput');
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
        
        if (this.themes.length > 0) {
            const lastThemeId = localStorage.getItem('notesAppLastTheme');
            if (lastThemeId && this.themes.find(t => t.id === lastThemeId)) {
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
        this.exportBtn.addEventListener('click', () => this.exportAllNotes());
        this.importBtn.addEventListener('click', () => this.importFileInput.click());
        this.importFileInput.addEventListener('change', (e) => this.importNotes(e));
        
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
        
        // Горячие клавиши
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 's':
                        e.preventDefault();
                        this.saveCurrentNote();
                        break;
                    case 'b':
                        e.preventDefault();
                        this.formatText('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.formatText('italic');
                        break;
                }
            }
        });
        
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
            alert('Нажмите кнопку "Поделиться" и выберите "На экран «Домой»"');
        }
    }
    
    loadThemes() {
        const savedThemes = localStorage.getItem('notesAppThemes');
        if (savedThemes) {
            this.themes = JSON.parse(savedThemes);
            this.renderThemes();
        }
    }
    
    saveThemes() {
        localStorage.setItem('notesAppThemes', JSON.stringify(this.themes));
    }
    
    renderThemes() {
        this.themeList.innerHTML = '';
        
        if (this.themes.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'Создайте первую тему';
            this.themeList.appendChild(emptyMessage);
            return;
        }
        
        this.themes.forEach(theme => {
            const themeItem = document.createElement('div');
            themeItem.className = 'theme-item';
            if (theme.id === this.currentThemeId) {
                themeItem.classList.add('active');
            }
            
            const themeName = document.createElement('span');
            themeName.textContent = theme.name;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-theme';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.deleteTheme(theme.id);
            };
            
            themeItem.appendChild(themeName);
            themeItem.appendChild(deleteBtn);
            themeItem.onclick = () => this.openTheme(theme.id);
            
            this.themeList.appendChild(themeItem);
        });
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
            this.showNotification('Введите название темы', 'error');
            return;
        }
        
        const newTheme = {
            id: Date.now().toString(),
            name: themeName,
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.themes.push(newTheme);
        this.saveThemes();
        this.renderThemes();
        this.openTheme(newTheme.id);
        this.closeAddThemeModal();
        this.showNotification('Тема создана');
    }
    
    deleteTheme(themeId) {
        if (!confirm('Удалить эту тему и все её конспекты?')) {
            return;
        }
        
        this.themes = this.themes.filter(t => t.id !== themeId);
        this.saveThemes();
        
        if (this.currentThemeId === themeId) {
            this.currentThemeId = null;
            this.noteEditor.value = '';
            this.noteEditor.disabled = true;
            this.currentThemeTitle.textContent = 'Выберите тему';
            localStorage.removeItem('notesAppLastTheme');
        }
        
        this.renderThemes();
        this.showNotification('Тема удалена', 'error');
    }
    
    openTheme(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return;
        
        this.saveCurrentNote();
        
        this.currentThemeId = themeId;
        this.currentThemeTitle.textContent = theme.name;
        this.noteEditor.value = theme.content || '';
        this.noteEditor.disabled = false;
        this.noteEditor.focus();
        
        localStorage.setItem('notesAppLastTheme', themeId);
        this.renderThemes();
        
        if (window.innerWidth <= 768) {
            this.sidebar.classList.remove('open');
        }
    }
    
    saveCurrentNote() {
        if (!this.currentThemeId) return;
        
        const theme = this.themes.find(t => t.id === this.currentThemeId);
        if (theme) {
            theme.content = this.noteEditor.value;
            theme.updatedAt = new Date().toISOString();
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
    
    // Форматирование текста
    formatText(type) {
        if (!this.currentThemeId) {
            this.showNotification('Выберите тему', 'error');
            return;
        }
        
        const editor = this.noteEditor;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = editor.value.substring(start, end);
        
        let formattedText = '';
        
        switch(type) {
            case 'h1':
                formattedText = `# ${selectedText || 'Заголовок 1'}`;
                break;
            case 'h2':
                formattedText = `## ${selectedText || 'Заголовок 2'}`;
                break;
            case 'h3':
                formattedText = `### ${selectedText || 'Заголовок 3'}`;
                break;
            case 'bold':
                formattedText = `**${selectedText || 'жирный текст'}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText || 'курсив'}*`;
                break;
            case 'underline':
                formattedText = `<u>${selectedText || 'подчеркнутый текст'}</u>`;
                break;
            case 'strike':
                formattedText = `~~${selectedText || 'зачеркнутый текст'}~~`;
                break;
            case 'list':
                formattedText = this.formatList(selectedText, false);
                break;
            case 'numbered-list':
                formattedText = this.formatList(selectedText, true);
                break;
            case 'checkbox':
                formattedText = `- [ ] ${selectedText || 'Задача'}`;
                break;
            case 'quote':
                formattedText = `> ${selectedText || 'Цитата'}`;
                break;
            case 'code':
                formattedText = `\`${selectedText || 'код'}\``;
                break;
            case 'link':
                formattedText = `[${selectedText || 'Текст ссылки'}](https://example.com)`;
                break;
            case 'hr':
                formattedText = `\n---\n`;
                break;
            default:
                return;
        }
        
        editor.value = editor.value.substring(0, start) + 
                       formattedText + 
                       editor.value.substring(end);
        
        editor.focus();
        const newPosition = start + formattedText.length;
        editor.setSelectionRange(newPosition, newPosition);
        
        this.startAutoSave();
    }
    
    formatList(text, numbered) {
        const lines = text.split('\n');
        return lines.map((line, index) => {
            if (numbered) {
                return `${index + 1}. ${line}`;
            } else {
                return `- ${line}`;
            }
        }).join('\n');
    }
    
    // Переключение вкладок редактора
    switchTab(tab) {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(t => t.classList.remove('active'));
        
        if (tab === 'write') {
            this.noteEditor.style.display = 'block';
            this.previewArea.style.display = 'none';
            tabs[0].classList.add('active');
        } else {
            this.noteEditor.style.display = 'none';
            this.previewArea.style.display = 'block';
            tabs[1].classList.add('active');
            this.renderPreview();
        }
    }
    
    renderPreview() {
        const markdown = this.noteEditor.value;
        this.previewArea.innerHTML = this.markdownToHtml(markdown);
    }
    
    markdownToHtml(markdown) {
        let html = markdown;
        
        // Код блоки
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Заголовки
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        
        // Жирный текст
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Курсив
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Зачеркнутый текст
        html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
        
        // Чекбоксы
        html = html.replace(/- \[ \] (.*)/g, '<input type="checkbox"> $1');
        html = html.replace(/- \[x\] (.*)/g, '<input type="checkbox" checked> $1');
        
        // Списки
        html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
        
        // Нумерованные списки
        html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
        
        // Цитаты
        html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
        
        // Код
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');
        
        // Ссылки
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Изображения
        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
        
        // Горизонтальная линия
        html = html.replace(/^---$/gm, '<hr>');
        
        // Подчеркивание
        html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');
        
        // Переносы строк
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/\n/g, '<br>');
        
        // Оборачивание в параграфы
        html = `<div class="markdown-content">${html}</div>`;
        
        return html;
    }
    
    // Экспорт всех заметок
    exportAllNotes() {
        const exportData = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            themes: this.themes
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `конспекты_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Данные экспортированы');
    }
    
    // Импорт заметок
    importNotes(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                
                if (importData.themes && Array.isArray(importData.themes)) {
                    if (confirm(`Импортировать ${importData.themes.length} тем?`)) {
                        this.themes = importData.themes;
                        this.saveThemes();
                        this.renderThemes();
                        
                        if (this.themes.length > 0) {
                            this.openTheme(this.themes[0].id);
                        }
                        
                        this.showNotification('Данные импортированы');
                    }
                } else {
                    this.showNotification('Неверный формат файла', 'error');
                }
            } catch (error) {
                this.showNotification('Ошибка импорта', 'error');
            }
        };
        
        reader.readAsText(file);
        event.target.value = '';
    }
    
    // Уведомления
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        if (type === 'error') {
            notification.style.background = '#f44336';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
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
