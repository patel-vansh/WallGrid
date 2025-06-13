import { createSettingsButton } from '../../core/settingsManager.js';
import { loadTileConfig } from '../../core/storage.js';
import defaultConfig from './config.js';

const config = loadTileConfig('clock', defaultConfig);

export async function render() {
    const el = document.createElement('div');
    el.className = 'tile';
    el.style.left = '160px';
    el.style.top = '20px';
    el.dataset.tileId = 'clock';

    const timeEl = document.createElement('div');
    const update = () => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let suffix = '';

        if (config.format === '12hr') {
            suffix = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12 || 12;
        }

        timeEl.innerText = `${hours}:${minutes}${suffix}`;
    };

    setInterval(update, 1000);
    update();

    el.appendChild(timeEl);

    const settingsBtn = createSettingsButton(() => {
        import('./settings.js').then(mod => mod.showSettings(el, config));
    });
    el.appendChild(settingsBtn);

    return el;
}