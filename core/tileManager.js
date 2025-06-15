import { getStorage } from './storage.js';
import { getCurrentThemeName } from './themeManager.js';

const availableTiles = ['clock']; // Add more as you develop

export async function renderTiles(container) {
    const theme = getCurrentThemeName();
    const layout = getStorage('tileLayout') || availableTiles;

    container.innerHTML = '';

    for (const tileId of layout) {
        try {
            const module = await import(`../tiles/${tileId}/tile.js`);
            if (!module || !module.render) {
                console.warn(`Tile "${tileId}" does not have a render function.`);
                continue;
            }
            if (!availableTiles.includes(tileId)) {
                console.warn(`Tile "${tileId}" is not available.`);
                continue;
            }
            if (module.defaultConfig && typeof module.defaultConfig !== 'object') {
                console.warn(`Tile "${tileId}" has an invalid defaultConfig.`);
                continue;
            }
            if (typeof module.render !== 'function') {
                console.warn(`Tile "${tileId}" does not export a render function.`);
                continue;
            }
            const customConfig = getStorage(`config-${tileId}`) || {};
            const config = { ...module.defaultConfig, ...customConfig };
            const tile = document.createElement('div');
            tile.id = `tile-${tileId}`;
            tile.className = `tile tile-${tileId}`;
            const tileContent = module.render(config, theme);
            tile.appendChild(tileContent);
            container.appendChild(tile);
        } catch (err) {
            console.warn(`Tile "${tileId}" failed to load:`, err);
        }
    }
}
