const KEY_LAYOUT = "wallgrid-layout";

export function saveLayout(layout) {
    localStorage.setItem(KEY_LAYOUT, JSON.stringify(layout));
}

export function loadLayout() {
    const raw = localStorage.getItem(KEY_LAYOUT);
    return raw ? JSON.parse(raw) : {};
}
