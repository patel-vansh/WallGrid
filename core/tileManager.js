import { loadLayout, saveLayout } from './storage.js';

const activeTiles = ['weather'];
let tileElements = [];

export async function renderTiles() {
    const container = document.getElementById('wallpaper-container');
    const layout = loadLayout();

    for (const tileId of activeTiles) {
        const tileModule = await import(`../tiles/${tileId}/tile.js`);
        const tileEl = await tileModule.render();

        // Restore position if available
        const pos = layout?.[tileId];
        if (pos) {
            tileEl.style.left = pos.left;
            tileEl.style.top = pos.top;
        }

        tileEl.dataset.tileId = tileId;
        container.appendChild(tileEl);
        tileElements.push(tileEl);
    }
}

export function enableEditMode() {
    tileElements.forEach(tile => {
        tile.classList.add('editing');

        tile.onmousedown = (e) => {
            const offsetX = e.offsetX;
            const offsetY = e.offsetY;

            const onMove = (ev) => {
                tile.style.left = `${ev.clientX - offsetX}px`;
                tile.style.top = `${ev.clientY - offsetY}px`;
            };

            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                saveTileLayout();
            };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        };
    });
}

export function disableEditMode() {
    tileElements.forEach(tile => {
        tile.classList.remove('editing');
        tile.onmousedown = null;
    });
}

function saveTileLayout() {
    const layout = {};
    tileElements.forEach(tile => {
        layout[tile.dataset.tileId] = {
            left: tile.style.left,
            top: tile.style.top,
        };
    });
    saveLayout(layout);
}
