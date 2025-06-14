import { getStorage } from './storage.js';
import { getCurrentTheme } from './themeManager.js';

const availableTiles = ['clock']; // Add more as you develop

export async function renderTiles(container) {
    const theme = getCurrentTheme();
    const layout = getStorage('tileLayout') || availableTiles;

    container.innerHTML = '';

    for (const tileId of layout) {
        try {
            const module = await import(`../tiles/${tileId}/index.js`);
            const config = getStorage(`config-${tileId}`) || module.defaultConfig || {};
            const tile = module.render(config, theme);
            tile.classList.add('tile');
            container.appendChild(tile);
        } catch (err) {
            console.warn(`Tile "${tileId}" failed to load:`, err);
        }
    }
}
