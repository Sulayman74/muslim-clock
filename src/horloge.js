import { calculateTimeUntilNextPrayer } from './prayer.js';
let lastTime = performance.now();
let showColon = true; // Variable pour contrôler l'affichage des deux-points
let lastSecond = -1; // Variable pour suivre la dernière seconde affichée
let randomColor; // Couleur des deux-points
let randomColor1; // 

// Tableau de couleurs
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A8'];
const colors1 = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];

export function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');


    // Choisir une couleur aléatoire pour chaque :

    // Changer l'affichage des deux-points en fonction de la seconde actuelle
    if (now.getSeconds() !== lastSecond) {
        showColon = !showColon; // Alterne l'affichage des deux-points
        lastSecond = now.getSeconds(); // Met à jour la dernière seconde
        randomColor = colors[Math.floor(Math.random() * colors.length)];
        randomColor1 = colors1[Math.floor(Math.random() * colors1.length)];
    }

    // Affiche les deux-points ou un espace selon la variable showColon
    const timeString = `${hours}<span style="color: ${randomColor};">${showColon ? ':' : ' '}</span>${minutes}<span style="color: ${randomColor1};">${showColon ? ':' : ' '}</span>${seconds}`;

    document.getElementById('clock').innerHTML = timeString; // Utiliser innerHTML pour permettre le rendu des <span>
    calculateTimeUntilNextPrayer()

    lastTime = performance.now();

    requestAnimationFrame(updateClock);
}

//pour que l'horloge soit plus exacte
requestAnimationFrame(updateClock);


