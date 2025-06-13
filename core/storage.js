const KEY_LAYOUT = "wallgrid-layout";
const CONFIG_PREFIX = 'wallgrid-config';


export function saveTileConfig(tileId, config) {
    localStorage.setItem(`${CONFIG_PREFIX}-${tileId}`, JSON.stringify(config));
}

export function loadTileConfig(tileId, defaultConfig = {}) {
    const raw = localStorage.getItem(`${CONFIG_PREFIX}-${tileId}`);
    return raw ? { ...defaultConfig, ...JSON.parse(raw) } : defaultConfig;
}

export function saveLayout(layout) {
    localStorage.setItem(KEY_LAYOUT, JSON.stringify(layout));
}

export function loadLayout() {
    const raw = localStorage.getItem(KEY_LAYOUT);
    return raw ? JSON.parse(raw) : {};
}


