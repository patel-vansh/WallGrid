import config from './config.js';

export async function render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'tile';
    wrapper.style.left = '20px';
    wrapper.style.top = '20px';

    const weatherData = await fetchWeather();

    wrapper.innerHTML = `
    <strong>${weatherData.temp}°C</strong><br>
    ${weatherData.condition}
  `;

    return wrapper;
}

async function fetchWeather() {
    // Dummy data – replace with API later
    return {
        temp: 30,
        condition: "☀️ Sunny"
    };
}