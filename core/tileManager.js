import { getStorage, saveStorage } from './storage.js';
import { getCurrentThemeName } from './themeManager.js';

export async function renderTiles(container) {
    const theme = getCurrentThemeName();
    // const layout = JSON.parse(getStorage('tileLayout')) || {"clock": {"left": "0px", "top": "0px"}};
    const layout = {"clock": {"left": "0px", "top": "0px"}};

    container.innerHTML = '';

    for (const tileId in layout) {
        try {
            const module = await import(`../tiles/${tileId}/tile.js`);
            if (!module || !module.render) {
                console.warn(`Tile "${tileId}" does not have a render function.`);
                continue;
            }
            // if (!availableTiles.includes(tileId)) {
            //     console.warn(`Tile "${tileId}" is not available.`);
            //     continue;
            // }
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
            tile.style.left = layout[tileId]?.left || '0px';
            tile.style.top = layout[tileId]?.top || '0px';
            const tileContent = module.render(config, theme);
            tile.appendChild(tileContent);
            container.appendChild(tile);
        } catch (err) {
            console.warn(`Tile "${tileId}" failed to load:`, err);
        }
    }
}

export function saveTileLayout(tileElements) {
    const layout = {};
    tileElements.forEach(tile => {
        layout[tile.dataset.tileId] = {
            left: tile.style.left,
            top: tile.style.top,
        };
    });
    saveStorage('tileLayout', JSON.stringify(layout));
}
