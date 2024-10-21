import { calculateTimeUntilNextPrayer, getPrayerTimes } from './prayer.js';

import { Geolocation } from '@capacitor/geolocation';
import { getCity } from './location.js';
import { getWeather } from './weather.js';
import { updateClock } from './horloge.js';

// Géolocalisation au chargement de l'application en permettant au fonction d'utiliser la position 
document.addEventListener('DOMContentLoaded', async () => {


    const position = await Geolocation.getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

console.log("position",latitude,longitude);
    getPrayerTimes(latitude, longitude);
    getCity(latitude, longitude);
    getWeather(latitude, longitude);
    calculateTimeUntilNextPrayer();
    // navigator.geolocation.getCurrentPosition(position => {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;

    //     getPrayerTimes(latitude, longitude);
    //     getCity(latitude, longitude);
    //     getWeather(latitude, longitude);
    //     calculateTimeUntilNextPrayer()
        
    // }, error => {
    //     console.error('Erreur lors de la récupération de la position géographique:', error);
    // });
    
    requestAnimationFrame(updateClock);
});


// const getCurrentPosition = async () => {
//     try {
//         const coordinates = await Geolocation.getCurrentPosition();
//         console.log('Current position:', coordinates);
//     } catch (error) {
//         console.error('Error getting location:', error);
//     }
// };

// getCurrentPosition();


// Navigation bottom bar

document.getElementById('btn-clock').addEventListener('click', () => {
    document.getElementById('time-container').classList.remove('hidden');
    document.getElementById('salat-container').classList.add('hidden');
    document.getElementById('weather-container').classList.add('hidden');
    setActiveButton('btn-clock');
});

document.getElementById('btn-prayers').addEventListener('click', () => {
    document.getElementById('time-container').classList.add('hidden');
    document.getElementById('salat-container').classList.remove('hidden');
    document.getElementById('weather-container').classList.add('hidden');
    setActiveButton('btn-prayers');
});

document.getElementById('btn-weather').addEventListener('click', () => {
    document.getElementById('time-container').classList.add('hidden');
    document.getElementById('salat-container').classList.add('hidden');
    document.getElementById('weather-container').classList.remove('hidden');
    setActiveButton('btn-weather');
});

function setActiveButton(buttonId) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(buttonId).classList.add('active');
}