export function saveState(state) {
    localStorage.setItem('wallgrid-state', JSON.stringify(state));
}

export function loadState() {
    const raw = localStorage.getItem('wallgrid-state');
    return raw ? JSON.parse(raw) : null;
}
