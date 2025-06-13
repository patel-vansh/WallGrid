const activeTiles = ['weather']; // future: make dynamic

export async function renderTiles() {
    const container = document.getElementById('wallpaper-container');

    for (const tileId of activeTiles) {
        try {
            const tileModule = await import(`../tiles/${tileId}/tile.js`);
            const tileEl = await tileModule.render();
            container.appendChild(tileEl);
        } catch (e) {
            console.error(`Failed to load tile: ${tileId}`, e);
        }
    }
}