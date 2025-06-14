import { loadTheme, applyTheme, getCurrentTheme } from './themeManager.js';
import { renderTiles } from './tileManager.js';
import { getEditMode, toggleEditMode } from './storage.js';
import './icons.js'; // Your Lucide icon loader

const settingsIcon = document.getElementById('settings-icon');
const container = document.getElementById('wallgrid-container');

document.addEventListener('DOMContentLoaded', () => {
    const theme = getCurrentTheme();
    applyTheme(theme);

    const isEditMode = getEditMode();
    if (isEditMode) document.body.classList.add('edit-mode');

    renderTiles(container);

    settingsIcon.addEventListener('click', () => {
        const toggled = toggleEditMode();
        document.body.classList.toggle('edit-mode', toggled);
    });
});
