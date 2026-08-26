* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: #1a1a1a;
    color: #e0e0e0;
    height: 100vh;
    overflow: hidden;
}

/* Экран установки */
.install-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    padding: 20px;
}

.install-container {
    text-align: center;
    max-width: 400px;
    width: 100%;
    background: #2d2d2d;
    padding: 40px 30px;
    border-radius: 20px;
    border: 1px solid #3d3d3d;
}

.install-container h1 {
    color: #fff;
    font-size: 2rem;
    margin-bottom: 15px;
}

.install-container p {
    color: #888;
    margin-bottom: 30px;
    line-height: 1.5;
}

.install-btn {
    width: 100%;
    padding: 15px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    transition: all 0.3s;
    margin-bottom: 30px;
}

.install-btn:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.install-info {
    text-align: left;
    background: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
}

.install-info p {
    margin-bottom: 10px;
    color: #e0e0e0;
}

.install-info p:last-child {
    margin-bottom: 0;
}

/* Основное приложение */
.app {
    display: flex;
    height: 100vh;
    position: relative;
}

/* Затемнение для мобильного меню */
.sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.sidebar-overlay.active {
    display: block;
}

/* Боковое меню */
.sidebar {
    width: 300px;
    background: #2d2d2d;
    border-right: 1px solid #3d3d3d;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    position: relative;
    z-index: 100;
    overflow: hidden;
}

.sidebar.collapsed {
    width: 0;
    border-right: none;
}

.sidebar.collapsed .sidebar-header,
.sidebar.collapsed .theme-list {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
}

.sidebar-header {
    padding: 20px;
    border-bottom: 1px solid #3d3d3d;
}

.sidebar-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.sidebar-header h2 {
    font-size: 1.2rem;
    color: #fff;
    margin: 0;
}

.collapse-btn, .expand-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.collapse-btn:hover, .expand-btn:hover {
    transform: scale(1.2);
}

.arrow-icon {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
}

.collapse-arrow {
    transform: rotate(90deg);
}

.expand-arrow {
    transform: rotate(-90deg);
}

.add-theme-btn {
    width: 100%;
    padding: 12px;
    background: #4a4a4a;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background 0.2s;
}

.add-theme-btn:hover {
    background: #5a5a5a;
}

.theme-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.theme-list::-webkit-scrollbar {
    width: 6px;
}

.theme-list::-webkit-scrollbar-track {
    background: transparent;
}

.theme-list::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
}

.theme-list::-webkit-scrollbar-thumb:hover {
    background: #777;
}

.theme-section-header {
    padding: 10px 15px;
    color: #888;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 10px;
    border-bottom: 1px solid #3d3d3d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
}

.section-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-toggle-btn, .section-add-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.section-toggle-btn:hover, .section-add-btn:hover {
    transform: scale(1.2);
}

.section-add-btn {
    font-size: 1.2rem;
    color: #e0e0e0;
    padding: 0 5px;
}

.section-arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
    opacity: 0.7;
}

.section-arrow.down {
    transform: rotate(0deg);
}

.section-arrow.up {
    transform: rotate(180deg);
}

.theme-item {
    padding: 12px 15px;
    margin-bottom: 5px;
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    color: #e0e0e0;
    font-size: 0.95rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.theme-item:hover {
    background: #3d3d3d;
}

.theme-item.active {
    background: #4a4a4a;
    color: #fff;
}

.theme-item .delete-theme {
    display: none;
    background: none;
    border: none;
    color: #ff6b6b;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0 5px;
}

.theme-item:hover .delete-theme {
    display: inline;
}

.empty-message {
    padding: 20px;
    text-align: center;
    color: #888;
}

/* Основная область */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.main-header {
    padding: 15px 20px;
    background: #2d2d2d;
    border-bottom: 1px solid #3d3d3d;
    display: flex;
    align-items: center;
    gap: 10px;
}

.main-header h1 {
    flex: 1;
    font-size: 1.3rem;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.connection-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    transition: all 0.3s ease;
}

.connection-indicator.online {
    background: #4CAF50;
}

.connection-indicator.medium {
    background: #FF9800;
}

.connection-indicator.poor {
    background: #FF5722;
}

.connection-indicator.offline {
    background: #f44336;
}

.save-btn {
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background 0.2s;
    white-space: nowrap;
}

.save-btn:hover {
    background: #45a049;
}

.save-btn:disabled {
    background: #4a4a4a;
    cursor: not-allowed;
    opacity: 0.5;
}

.settings-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.settings-icon-btn:hover {
    transform: scale(1.1);
}

.menu-icon-line {
    display: block;
    width: 20px;
    height: 2px;
    background-color: #e0e0e0;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.settings-icon-btn:hover .menu-icon-line {
    background-color: #ffffff;
}

.editor-area {
    flex: 1;
    padding: 20px;
    position: relative;
}

#noteEditor {
    width: 100%;
    height: 100%;
    background: #2d2d2d;
    border: 1px solid #3d3d3d;
    border-radius: 8px;
    padding: 20px;
    color: #e0e0e0;
    font-size: 1rem;
    line-height: 1.6;
    resize: none;
    outline: none;
    transition: border-color 0.3s ease;
}

#noteEditor:focus {
    border-color: #3d3d3d;
}

#noteEditor:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background: #2a2a2a;
}

#noteEditor[readonly] {
    opacity: 0.8;
    cursor: default;
    background: #2a2a2a;
    border-color: #3d3d3d;
}

/* Редактор кода */
.code-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.code-textarea {
    width: 100%;
    flex: 1;
    min-height: 300px;
    background: #1a1a1a;
    border: 1px solid #3d3d3d;
    border-radius: 8px;
    padding: 15px;
    color: #e0e0e0;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    resize: none;
    outline: none;
}

.code-actions {
    display: flex;
    gap: 10px;
    align-items: center;
}

.run-btn {
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background 0.2s;
}

.run-btn:hover {
    background: #45a049;
}

.toggle-output-btn {
    padding: 10px 15px;
    background: #4a4a4a;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background 0.2s;
}

.toggle-output-btn:hover {
    background: #5a5a5a;
}

.code-output-mini {
    flex: 1;
    min-height: 150px;
    max-height: 250px;
    border: 1px solid #3d3d3d;
    border-radius: 8px;
    overflow: hidden;
}

#codeIframeMini {
    width: 100%;
    height: 100%;
    background: white;
    border: none;
}

/* Полноэкранный вывод */
.fullscreen-output {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1a1a1a;
    z-index: 2000;
    display: flex;
    flex-direction: column;
}

.fullscreen-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background: #2d2d2d;
    border-bottom: 1px solid #3d3d3d;
}

.fullscreen-header h3 {
    color: #fff;
    font-size: 1.2rem;
}

.close-fullscreen-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px 10px;
    transition: transform 0.2s;
}

.close-fullscreen-btn:hover {
    transform: scale(1.2);
}

#codeIframeFull {
    flex: 1;
    background: white;
    border: none;
}

.console-output-full {
    max-height: 200px;
    overflow-y: auto;
    background: #1a1a1a;
    border-top: 1px solid #3d3d3d;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    color: #e0e0e0;
}

.console-log {
    margin-bottom: 5px;
}

.console-error {
    color: #ff6b6b;
}

/* Панель настроек */
.settings-panel {
    width: 100%;
    height: 100%;
    background: #2d2d2d;
    border: 1px solid #3d3d3d;
    border-radius: 8px;
    padding: 20px;
    overflow-y: auto;
}

.settings-header {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #3d3d3d;
}

.settings-header h3 {
    color: #fff;
    font-size: 1.3rem;
}

.settings-content {
    max-width: 400px;
}

.settings-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background: #1a1a1a;
    border-radius: 8px;
}

.settings-option label {
    color: #e0e0e0;
    font-size: 1rem;
}

.settings-option input[type="checkbox"] {
    width: auto;
    margin: 0;
    cursor: pointer;
}

/* Индикатор оффлайн режима */
.offline-indicator {
    background: #f44336;
    color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}

.close-offline {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 5px;
    transition: transform 0.2s;
}

.close-offline:hover {
    transform: scale(1.2);
}

/* Модальное окно */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    align-items: center;
    justify-content: center;
}

.modal.active {
    display: flex;
}

.modal-content {
    background: #2d2d2d;
    padding: 25px;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
}

.modal-content h3 {
    margin-bottom: 20px;
    color: #fff;
}

.modal-content input {
    width: 100%;
    padding: 12px;
    background: #1a1a1a;
    border: 1px solid #3d3d3d;
    border-radius: 6px;
    color: #e0e0e0;
    margin-bottom: 20px;
    font-size: 1rem;
}

.modal-content input:focus {
    outline: none;
    border-color: #4CAF50;
}

.modal-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.modal-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s;
}

#cancelAddTheme, #cancelAddFile {
    background: #4a4a4a;
    color: #e0e0e0;
}

#cancelAddTheme:hover, #cancelAddFile:hover {
    background: #5a5a5a;
}

#confirmAddTheme, #confirmAddFile {
    background: #4CAF50;
    color: white;
}

#confirmAddTheme:hover, #confirmAddFile:hover {
    background: #45a049;
}

/* Адаптивный дизайн для мобильных */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        transform: translateX(-100%);
        width: 280px;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
    
    .sidebar.collapsed {
        transform: translateX(-100%);
        width: 280px;
    }
    
    .main-header {
        padding: 10px 15px;
    }
    
    .main-header h1 {
        font-size: 1rem;
    }
    
    .connection-indicator {
        width: 10px;
        height: 10px;
    }
    
    .save-btn {
        padding: 8px 15px;
        font-size: 0.9rem;
    }
    
    .editor-area {
        padding: 10px;
    }
    
    #noteEditor {
        padding: 15px;
        font-size: 0.95rem;
    }
    
    .arrow-icon {
        width: 25px;
        height: 25px;
    }
    
    .code-textarea {
        min-height: 200px;
    }
}

/* Светлая тема */
body.light-theme {
    background: #f5f5f5;
    color: #333;
}

body.light-theme .install-screen {
    background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
}

body.light-theme .install-container {
    background: #ffffff;
    border: 1px solid #ddd;
}

body.light-theme .sidebar {
    background: #ffffff;
    border-right: 1px solid #ddd;
}

body.light-theme .main-header {
    background: #ffffff;
    border-bottom: 1px solid #ddd;
}

body.light-theme .main-header h1 {
    color: #333;
}

body.light-theme .theme-item {
    color: #333;
}

body.light-theme .theme-item:hover {
    background: #f0f0f0;
}

body.light-theme .theme-item.active {
    background: #e0e0e0;
    color: #000;
}

body.light-theme #noteEditor {
    background: #ffffff;
    border: 1px solid #ddd;
    color: #333;
}

body.light-theme #noteEditor:focus {
    border-color: #ddd;
}

body.light-theme #noteEditor:disabled,
body.light-theme #noteEditor[readonly] {
    background: #f5f5f5;
}

body.light-theme .settings-panel {
    background: #ffffff;
    border: 1px solid #ddd;
}

body.light-theme .settings-header h3 {
    color: #333;
}

body.light-theme .settings-option {
    background: #f5f5f5;
}

body.light-theme .settings-option label {
    color: #333;
}

body.light-theme .modal-content {
    background: #ffffff;
}

body.light-theme .modal-content h3 {
    color: #333;
}

body.light-theme .modal-content input {
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #333;
}

body.light-theme .add-theme-btn {
    background: #e0e0e0;
    color: #333;
}

body.light-theme .add-theme-btn:hover {
    background: #d0d0d0;
}

body.light-theme .theme-section-header {
    color: #666;
    border-bottom: 1px solid #ddd;
}

body.light-theme .sidebar-header h2 {
    color: #333;
}

body.light-theme .theme-list::-webkit-scrollbar-thumb {
    background: #bbb;
}

body.light-theme .theme-list::-webkit-scrollbar-thumb:hover {
    background: #999;
}

body.light-theme .menu-icon-line {
    background-color: #333;
}

body.light-theme .settings-icon-btn:hover .menu-icon-line {
    background-color: #000;
}

body.light-theme .arrow-icon {
    filter: brightness(0.3);
}

body.light-theme .section-arrow {
    filter: brightness(0.5);
}

body.light-theme .section-add-btn {
    color: #333;
}

body.light-theme .code-textarea {
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #333;
}

body.light-theme .toggle-output-btn {
    background: #e0e0e0;
    color: #333;
}

body.light-theme .toggle-output-btn:hover {
    background: #d0d0d0;
}

body.light-theme .fullscreen-output {
    background: #f5f5f5;
}

body.light-theme .fullscreen-header {
    background: #ffffff;
    border-bottom: 1px solid #ddd;
}

body.light-theme .fullscreen-header h3 {
    color: #333;
}

body.light-theme .close-fullscreen-btn {
    color: #333;
}

body.light-theme .console-output-full {
    background: #f5f5f5;
    border-top: 1px solid #ddd;
    color: #333;
}
