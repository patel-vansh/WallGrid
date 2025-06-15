export const defaultConfig = {
    "format": "HH:mm:ss",
    "showSeconds": true,
    "showDate": true,
    "showTimeZone": true,
    "timeZone": "Asia/Kolkata",
    "hourFormat12": false
};

export function render(config, theme) {
    const tile = document.createElement('div');
    const timeElement = document.createElement('div');
    timeElement.className = 'time';
    tile.appendChild(timeElement);

    const dateElement = document.createElement('div');
    dateElement.className = 'date';
    tile.appendChild(dateElement);

    const timeZoneElement = document.createElement('div');
    timeZoneElement.className = 'time-zone';
    tile.appendChild(timeZoneElement);

    function updateClock() {
        const now = new Date();
        let options = { hour: '2-digit', minute: '2-digit', timeZone: config.timeZone };
        if (config.showSeconds) options.second = '2-digit';
        if (config.hourFormat12) options.hour12 = true;
        const timeString = now.toLocaleTimeString(undefined, options);
        timeElement.textContent = timeString;

        if (config.showDate) {
            dateElement.textContent = now.toLocaleDateString(undefined, { timeZone: config.timeZone });
        }

        if (config.showTimeZone) {
            timeZoneElement.textContent = config.timeZone;
        }
    }

    updateClock();
    setInterval(updateClock, 500);

    return tile;
}