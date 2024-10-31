import { calculateTimeUntilNextPrayer, getPrayerTimes } from './prayer.js';

import { Geolocation } from '@capacitor/geolocation';
import { getCity } from './location.js';
import { getQiblah } from './qiblah.js'
import { getWeather } from './weather.js';
import { updateClock } from './horloge.js';
import { updateDates } from './hijri-date.js';

// Géolocalisation au chargement de l'application en permettant au fonction d'utiliser la position 
document.addEventListener('DOMContentLoaded', async () => {

    try {
        const position = await Geolocation.getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        await Promise.all([
            getPrayerTimes(latitude, longitude),
            getCity(latitude, longitude),
            getWeather(latitude, longitude),
            getQiblah(latitude,longitude)
        ]);
        calculateTimeUntilNextPrayer()
        updateDates()
        updateClock()
    } catch (error) {
        console.error('Erreur lors de la récupération de la position géographique:', error);
    }


});


// Get both icon elements
const toggleOff = document.getElementById('toggleOff');
const toggleOn = document.getElementById('toggleOn');

// Initial state (off)
let isToggled = false;

// Add click event to toggle between on and off states
toggleOff.addEventListener('click', () => {

    if (!isToggled) {
        // Hide the 'off' icon and show the 'on' icon
        toggleOff.classList.add('hidden');
        toggleOff.classList.remove('visible');
        toggleOn.classList.remove('hidden');
        toggleOn.classList.add('visible');
        isToggled = true;
        document.body.classList.toggle('dark-mode');

    }
});

toggleOn.addEventListener('click', () => {
    if (isToggled) {
        // Hide the 'on' icon and show the 'off' icon
        toggleOn.classList.add('hidden');
        toggleOn.classList.remove('visible');
        toggleOff.classList.remove('hidden');
        toggleOff.classList.add('visible');
        isToggled = false;
        document.body.classList.remove('dark-mode')
    }
});

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