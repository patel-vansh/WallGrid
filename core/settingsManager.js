// Coming soon: UI for editing tile settings
export function getTileSettings(tileId) {
    return {}; // placeholder
}

export function createSettingsButton(onClick) {
    const btn = document.createElement('button');
    btn.innerText = '⚙️';
    btn.style.marginTop = '5px';
    btn.style.background = 'transparent';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '16px';
    btn.title = 'Settings';
    btn.onclick = (e) => {
        e.stopPropagation();
        onClick();
    };
    return btn;
}
