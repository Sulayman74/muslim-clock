// Récupération de la météo et prévisions météo avec clé api pour le compte gratuit selon la position lat long
const apiKey = '5nBgtuFCSzybfaYx';

export async function getWeather(latitude, longitude) {
    const urlForecast = `https://my.meteoblue.com/packages/basic-day?lat=${latitude}&lon=${longitude}&forecast_days=3&apikey=${apiKey}`;

    try {
        const response = await fetch(urlForecast);
        if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.status);
        }

        const data = await response.json();
        if (!data) {
            throw new Error('Aucune donnée météo disponible.');
        }

        displayWeatherForecast(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données météo:', error);
        document.getElementById('weather-forecast').innerHTML = 'Impossible de récupérer les données météo.';
    }
}

export function displayWeatherForecast(forecastData) {
    const data = forecastData.data_day;
    let forecastHTML = '';
    const jours = data.time;

    jours.forEach((day, index) => {
        forecastHTML +=
            `
            <div class="weather-card">
            <img style="width: 50px; height: auto; border-radius: 8px;" src="${getPictogramImage(data.pictocode[index])}.png" alt="Pictogramme météo">
                <h3>${formatDate(day)}</h3>
                <p>Température max : ${data.temperature_max[index].toFixed(1)} °C</p>
                <p>Température min : ${data.temperature_min[index].toFixed(1)} °C</p>
                <p>Précipitations : ${data.precipitation[index].toFixed(1)} mm</p>
            </div>
        `;
        // forecastHTML += `<h3>${formatDate(day)}</h3>`;
        // forecastHTML += `<p>Température max : ${data.temperature_max[index].toFixed(1)} °C</p>`;
        // forecastHTML += `<p>Température min : ${data.temperature_min[index].toFixed(1)} °C</p>`;
        // forecastHTML += `<p>Précipitations : ${data.precipitation[index].toFixed(1)} mm</p>`;
        // forecastHTML += `<img  style="width: 50px; height: auto; border-radius: 8px;" src="${getPictogramImage(data.pictocode[index])}.png" alt="Pictogramme météo">`;
    });

    document.getElementById('weather-forecast').innerHTML = forecastHTML;
}

function formatDate(day) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(day);
    return date.toLocaleDateString('fr-FR', options);
}

function getPictogramImage(pictocode) {
    const currentHour = new Date().getHours(); // Obtenir l'heure actuelle
    const dayOrNight = (currentHour >= 6 && currentHour < 18) ? 'iday' : 'night'; // Déterminer si c'est le jour ou la nuit
    const paddedPictocode = pictocode.toString().padStart(2, '0'); // Ajouter un zéro devant si nécessaire
    return `../assets/${paddedPictocode}_${dayOrNight}`; // Construire le chemin
}

function updateWeather() {
    // Appelle la fonction pour obtenir les données météo
    fetchWeatherData().then(forecastData => {
        displayWeatherForecast(forecastData);
    });
}

function checkAndUpdateWeather() {
    const lastUpdate = localStorage.getItem('lastWeatherUpdate');
    const now = new Date().getTime();

    // Mettre à jour si plus d'une heure s'est écoulée
    if (!lastUpdate || (now - lastUpdate > 3600000)) { // 3600000 ms = 1 heure
        localStorage.setItem('lastWeatherUpdate', now);
        updateWeather(); // Appelle la fonction pour mettre à jour les données météo
    }
}

// Appel initial
checkAndUpdateWeather();

// Ajoute l'écouteur pour l'événement visibilitychange
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        checkAndUpdateWeather(); // Vérifie à nouveau lors du retour sur l'application
    }
});
