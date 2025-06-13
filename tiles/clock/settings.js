import { saveTileConfig } from '../../core/storage.js';

export function showSettings(tileEl, config) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.color = 'white';
    modal.style.zIndex = '999';

    modal.innerHTML = `
        <label>
            <input type="radio" name="format" value="24hr" ${config.format === '24hr' ? 'checked' : ''} />
            24-Hour
        </label><br/>
        <label>
            <input type="radio" name="format" value="12hr" ${config.format === '12hr' ? 'checked' : ''} />
            12-Hour
        </label><br/><br/>
        <button id="saveClockSettings">Save</button>
    `;

    modal.querySelector('#saveClockSettings').onclick = () => {
        const newFormat = modal.querySelector('input[name="format"]:checked').value;
        config.format = newFormat;
        saveTileConfig('clock', config);
        location.reload(); // re-render tile
    };

    document.body.appendChild(modal);
}