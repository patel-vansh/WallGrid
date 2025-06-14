export function getStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return null;
    }
}

export function saveStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getEditMode() {
    return localStorage.getItem('editMode') === 'true';
}

export function toggleEditMode() {
    const mode = !getEditMode();
    localStorage.setItem('editMode', mode);
    return mode;
}
