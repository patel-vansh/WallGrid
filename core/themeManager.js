import { getStorage, saveStorage } from './storage.js';

const defaultThemeName = 'device'; // fallback

export async function getCurrentThemeName() {
    return getStorage('theme') || defaultThemeName;
}

export async function getCurrentTheme() {
    const themeName = await getCurrentThemeName();
    return await loadTheme(themeName);
}

export async function getCurrentTileTheme() {
    
}

export async function loadTheme(name) {
    if (name === 'device') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        name = isDark ? 'dark' : 'light';
    }

    try {
        const res = await fetch(`themes/${name}.json`);
        const data = await res.json();
        applyTheme(data.colors);
        saveStorage('theme', name);
        return data;
    } catch (err) {
        console.warn(`Failed to load theme "${name}".`, err);
        return {};
    }
}

export function applyTheme(colors) {
    Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
}