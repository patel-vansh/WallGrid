/**
 * @fileoverview Manages theming (CSS variables) for tiles and wallpaper.
 * Handles applying system/user theme, saving theme settings, and exposing theme API.
 * @module core/themeManager
 */

import { getStorage, saveStorage } from './storage.js';

const defaultThemeName = 'device'; // fallback

const themes = {
    "device": {
        "name": "Device",
        "description": "Align the theme according to your device for consistency.",
        "type": "device"
    },
    "light": {
        "name": "Light",
        "description": "A light theme with soft colors for a clean and bright interface.",
        "type": "core",
        "colors": {
            "--wall-bg": "#fff",
            "--tile-bg": "rgba(0, 0, 0, 0.08)",
            "--tile-text": "#111",
            "--tile-text-secondary": "#444",
            "--btn-bg": "rgba(0, 0, 0, 0.1)",
            "--btn-text": "#111",
            "--btn-text-secondary": "#444",
            "--btn-bg-hover": "#111",
            "--btn-text-hover": "#fff",
            "--btn-bg-active": "rgba(255, 255, 255, 0.3)",
            "--btn-text-active": "#111"
        }
    },
    "dark": {
        "name": "Dark",
        "description": "A dark theme with high contrast for better visibility in low light conditions.",
        "type": "core",
        "colors": {
            "--wall-bg": "#111",
            "--tile-bg": "rgba(255, 255, 255, 0.08)",
            "--tile-text": "#fff",
            "--tile-text-secondary": "#ccc",
            "--btn-bg": "rgba(255, 255, 255, 0.1)",
            "--btn-text": "#fff",
            "--btn-text-secondary": "#ccc",
            "--btn-bg-hover": "white",
            "--btn-text-hover": "#111",
            "--btn-bg-active": "rgba(255, 255, 255, 0.3)",
            "--btn-text-active": "#111"
        }
    }
};

export function getCurrentThemeName() {
    return getStorage('theme') || defaultThemeName;
}

export function getTheme(name) {
    if (name === 'device') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        name = isDark ? 'dark' : 'light';
    }

    if (!themes[name]) {
        console.warn(`Theme "${name}" not found, falling back to default.`);
        name = defaultThemeName;
    }

    return themes[name];
}

export function applyTheme(themeName) {
    const theme = getTheme(themeName);
    Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
    saveStorage('theme', themeName);
}