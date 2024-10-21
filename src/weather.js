// Récupération de la météo et prévisions météo avec clé api pour le compte gratuit selon la position lat long
const apiKey = '5nBgtuFCSzybfaYx';

export async function getWeather(latitude, longitude) {
    const urlForecast = `https://my.meteoblue.com/packages/basic-day?lat=${latitude}&lon=${longitude}&history_days=1&forecast_days=2&apikey=${apiKey}`;

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
        forecastHTML += `<h3>${formatDate(day)}</h3>`;
        forecastHTML += `<p>Température max : ${data.temperature_max[index].toFixed(1)} °C</p>`;
        forecastHTML += `<p>Température min : ${data.temperature_min[index].toFixed(1)} °C</p>`;
        forecastHTML += `<p>Précipitations : ${data.precipitation[index].toFixed(1)} mm</p>`;
        forecastHTML += `<img  style="width: 50px; height: auto; border-radius: 8px;" src="${getPictogramImage(data.pictocode[index])}.png" alt="Pictogramme météo">`;
    });

    document.getElementById('weather-forecast').innerHTML = forecastHTML;
}

function formatDate(day) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(day);
    return date.toLocaleDateString('fr-FR', options);
}

function getPictogramImage(pictocode) {
    const currentHour = new Date().getHours(); // Obtenir l'heure actuelle
    const dayOrNight = (currentHour >= 6 && currentHour < 18) ? 'iday' : 'night'; // Déterminer si c'est le jour ou la nuit
    const paddedPictocode = pictocode.toString().padStart(2, '0'); // Ajouter un zéro devant si nécessaire
    return `../assets/${paddedPictocode}_${dayOrNight}`; // Construire le chemin
}