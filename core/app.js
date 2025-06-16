import { applyTheme, getCurrentThemeName } from './themeManager.js';
import { renderTiles, saveTileLayout } from './tileManager.js';
import { toggleEditMode } from './storage.js';
import './icons.js';
import {
    createElement, Check,
    Settings, Paintbrush, Plus,
    Moon, Sun, Monitor
} from '../assets/icons/lucide.js';

const settingsBtn = document.getElementById('settings-icon');
const addTileBtn = document.getElementById('add-tile-icon');
const changeThemeBtn = document.getElementById('change-theme-icon');
const changeThemeDarkBtn = document.getElementById('change-theme-dark-icon');
const changeThemeLightBtn = document.getElementById('change-theme-light-icon');
const changeThemeDeviceBtn = document.getElementById('change-theme-device-icon');
const container = document.getElementById('wallgrid-container');


document.addEventListener('DOMContentLoaded', () => {
    const theme = getCurrentThemeName();
    applyTheme(theme);

    settingsBtn.innerHTML = ''; // Clear existing icon
    settingsBtn.appendChild(createElement(Settings));

    addTileBtn.innerHTML = ''; // Clear existing icon
    addTileBtn.appendChild(createElement(Plus));

    changeThemeBtn.innerHTML = ''; // Clear existing icon
    changeThemeBtn.appendChild(createElement(Paintbrush));

    changeThemeDarkBtn.innerHTML = ''; // Clear existing icon
    changeThemeDarkBtn.appendChild(createElement(Moon));

    changeThemeLightBtn.innerHTML = ''; // Clear existing icon
    changeThemeLightBtn.appendChild(createElement(Sun));

    changeThemeDeviceBtn.innerHTML = ''; // Clear existing icon
    changeThemeDeviceBtn.appendChild(createElement(Monitor));

    disableEditMode();

    hideThemeButtons();

    renderTiles(container);

    settingsBtn.addEventListener('click', () => {
        const toggled = toggleEditMode();

        const newIcon = createElement(toggled ? Check : Settings);

        settingsBtn.innerHTML = ''; // Clear existing icon
        settingsBtn.appendChild(newIcon);

        if (toggled) {
            enableEditMode();
        } else {
            disableEditMode();
        }
    });

    changeThemeBtn.addEventListener('click', () => {
        const currentTheme = getCurrentThemeName();
        if (changeThemeDarkBtn.style.display === 'block') {
            hideThemeButtons();
        } else {
            showThemeButtons();
            if (currentTheme === 'dark') {
                changeThemeDarkBtn.classList.add('active');
                changeThemeLightBtn.classList.remove('active');
                changeThemeDeviceBtn.classList.remove('active');
            } else if (currentTheme === 'light') {
                changeThemeDarkBtn.classList.remove('active');
                changeThemeLightBtn.classList.add('active');
                changeThemeDeviceBtn.classList.remove('active');
            } else if (currentTheme === 'device') {
                changeThemeDarkBtn.classList.remove('active');
                changeThemeLightBtn.classList.remove('active');
                changeThemeDeviceBtn.classList.add('active');
            }
        }
    });

    changeThemeDarkBtn.addEventListener('click', () => {
        applyTheme('dark');
        changeThemeDarkBtn.classList.add('active');
        changeThemeLightBtn.classList.remove('active');
        changeThemeDeviceBtn.classList.remove('active');
    });

    changeThemeLightBtn.addEventListener('click', () => {
        applyTheme('light');
        changeThemeDarkBtn.classList.remove('active');
        changeThemeLightBtn.classList.add('active');
        changeThemeDeviceBtn.classList.remove('active');
    });

    changeThemeDeviceBtn.addEventListener('click', () => {
        applyTheme('device');
        changeThemeDarkBtn.classList.remove('active');
        changeThemeLightBtn.classList.remove('active');
        changeThemeDeviceBtn.classList.add('active');
    });
});

function enableEditMode() {
    document.body.classList.add('edit-mode');
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.add('edit-mode');
    });
    settingsBtn.classList.add('edit-mode');
    enableDragForTiles();
    showEditButtons();
    toggleEditMode(true);
}

function enableDragForTiles() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.onmousedown = (e) => {
            e.preventDefault(); // prevent text selection during drag

            const rect = tile.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const onMove = (ev) => {
                tile.style.position = 'absolute'; // Ensure tile is positioned
                tile.style.left = `${ev.clientX - offsetX}px`;
                tile.style.top = `${ev.clientY - offsetY}px`;
            };

            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                saveTileLayout(document.querySelectorAll('.tile'));
            };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        };
    });
}

function disableEditMode() {
    document.body.classList.remove('edit-mode');
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove('edit-mode');
        tile.onmousedown = null;
    });
    settingsBtn.classList.remove('edit-mode');
    hideEditButtons();
    hideThemeButtons();
    toggleEditMode(false);
}

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

function showThemeButtons() {
    changeThemeDarkBtn.style.display = 'block';
    changeThemeLightBtn.style.display = 'block';
    changeThemeDeviceBtn.style.display = 'block';

    changeThemeDarkBtn.classList.add('popup-enter');
    changeThemeLightBtn.classList.add('popup-enter');
    changeThemeDeviceBtn.classList.add('popup-enter');

    setTimeout(() => {
        changeThemeDarkBtn.classList.remove('popup-enter');
        changeThemeLightBtn.classList.remove('popup-enter');
        changeThemeDeviceBtn.classList.remove('popup-enter');
    }, 300); // Match the CSS transition duration
}

function hideThemeButtons() {
    changeThemeDarkBtn.classList.remove('popup-enter');
    changeThemeLightBtn.classList.remove('popup-enter');
    changeThemeDeviceBtn.classList.remove('popup-enter');

    changeThemeDarkBtn.classList.add('popup-exit');
    changeThemeLightBtn.classList.add('popup-exit');
    changeThemeDeviceBtn.classList.add('popup-exit');

    setTimeout(() => {
        changeThemeDarkBtn.classList.remove('popup-exit');
        changeThemeLightBtn.classList.remove('popup-exit');
        changeThemeDeviceBtn.classList.remove('popup-exit');
        changeThemeDarkBtn.style.display = 'none';
        changeThemeLightBtn.style.display = 'none';
        changeThemeDeviceBtn.style.display = 'none';
    }, 300); // Match the CSS transition duration
}
