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
    }
    
    // ... (остальные методы из вашего кода остаются без изменений)
    
    // Функция форматирования текста
    formatText(type) {
        const editor = this.noteEditor;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = editor.value.substring(start, end);
        
        let formattedText = '';
        let newCursorPos = start;
        
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
    
    // Вспомогательная функция для форматирования списков
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
    
    // Рендеринг предпросмотра
    renderPreview() {
        const markdown = this.noteEditor.value;
        this.previewArea.innerHTML = this.markdownToHtml(markdown);
    }
    
    // Конвертация Markdown в HTML
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
    
    // Показать уведомление
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            animation: slideIn 0.3s ease;
            z-index: 2000;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Добавьте анимации в style.css
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    const app = new NotesApp();
    window.app = app;
});
