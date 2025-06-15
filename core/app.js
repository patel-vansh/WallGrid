import { applyTheme, getCurrentThemeName } from './themeManager.js';
import { renderTiles } from './tileManager.js';
import { getEditMode, toggleEditMode } from './storage.js';
import './icons.js';
import { createElement, Check, Settings, Paintbrush, Plus } from '../assets/icons/lucide.js';

const settingsBtn = document.getElementById('settings-icon');
const addTileBtn = document.getElementById('add-tile-icon');
const changeThemeBtn = document.getElementById('change-theme-icon');
const container = document.getElementById('wallgrid-container');


document.addEventListener('DOMContentLoaded', () => {
    const theme = getCurrentThemeName();
    applyTheme(theme);

    const isEditMode = getEditMode();
    settingsBtn.innerHTML = ''; // Clear existing icon
    settingsBtn.appendChild(createElement(isEditMode ? Check : Settings));

    addTileBtn.innerHTML = ''; // Clear existing icon
    addTileBtn.appendChild(createElement(Plus));

    changeThemeBtn.innerHTML = ''; // Clear existing icon
    changeThemeBtn.appendChild(createElement(Paintbrush));

    if (isEditMode) {
        document.body.classList.add('edit-mode');
        settingsBtn.classList.add('edit-mode');
        showEditButtons();
    } else {
        document.body.classList.remove('edit-mode');
        settingsBtn.classList.remove('edit-mode');
        hideEditButtons();
    }

    renderTiles(container);

    settingsBtn.addEventListener('click', () => {
        const toggled = toggleEditMode();

        const newIcon = createElement(toggled ? Check : Settings);

        settingsBtn.innerHTML = ''; // Clear existing icon
        settingsBtn.appendChild(newIcon);
        document.body.classList.toggle('edit-mode', toggled);
        settingsBtn.classList.toggle('edit-mode', toggled);

        if (toggled) {
            showEditButtons();
        } else {
            hideEditButtons();
        }
    });

    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            tile.style.setProperty('--mouse-x', `${x}px`);
            tile.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

function showEditButtons() {
    addTileBtn.style.display = 'block';
    changeThemeBtn.style.display = 'block';

    addTileBtn.classList.add('popup-enter');
    changeThemeBtn.classList.add('popup-enter');
    setTimeout(() => {
        addTileBtn.classList.remove('popup-enter');
        changeThemeBtn.classList.remove('popup-enter');
    }, 300); // Match the CSS transition duration
}

function hideEditButtons() {
    addTileBtn.classList.remove('popup-enter');
    changeThemeBtn.classList.remove('popup-enter');

    addTileBtn.classList.add('popup-exit');
    changeThemeBtn.classList.add('popup-exit');

    setTimeout(() => {
        addTileBtn.classList.remove('popup-exit');
        changeThemeBtn.classList.remove('popup-exit');
        addTileBtn.style.display = 'none';
        changeThemeBtn.style.display = 'none';
    }, 300); // Match the CSS transition duration
}
