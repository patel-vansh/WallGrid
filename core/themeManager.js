const THEME_KEY = 'wallgrid-theme';

export function applyTheme() {
    const theme = JSON.parse(localStorage.getItem(THEME_KEY)) || {};
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
}

export function saveThemeVariable(key, value) {
    const current = JSON.parse(localStorage.getItem(THEME_KEY)) || {};
    current[key] = value;
    localStorage.setItem(THEME_KEY, JSON.stringify(current));
    applyTheme(); // apply immediately
}
