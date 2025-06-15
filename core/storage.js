const STORAGE_PREFIX = "wallgrid-";

export function getStorage(key) {
    try {
        return localStorage.getItem(STORAGE_PREFIX + key);
    } catch {
        return null;
    }
}

export function saveStorage(key, value) {
    localStorage.setItem(STORAGE_PREFIX + key, value);
}

export function getEditMode() {
    return localStorage.getItem(STORAGE_PREFIX + 'edit-mode') === 'true';
}

export function toggleEditMode() {
    const mode = !getEditMode();
    localStorage.setItem(STORAGE_PREFIX + 'edit-mode', mode);
    return mode;
}
