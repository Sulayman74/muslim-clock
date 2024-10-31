// import { Motion } from '@capacitor/motion';
// import { PluginListenerHandle } from '@capacitor/core';

// export async function getQiblah(latitude, longitude) {

//     const apiUrl = `
// http://api.aladhan.com/v1/qibla/${latitude}/${longitude}
//     `

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         const qiblahAngle = data.data.direction;
//         console.log("angle Qiblah", qiblahAngle);

//         document.getElementById('qiblah-angle').innerHTML = `Direction de la Qiblah : ${qiblahAngle.toFixed(2)}°`;
//         updateQiblahDirection(qiblahAngle);

//         // Ajoute ici du code pour orienter une flèche visuelle vers l'angle donné
//     } catch (error) {
//         console.error('Erreur lors de la récupération de la direction de la Qiblah:', error);
//     }

// }
// function updateQiblahDirection(qiblahAngle) {
//     const arrow = document.getElementById('direction-arrow');
//     arrow.style.transform = `translate(-50%, -100%) rotate(${qiblahAngle}deg)`;

//     // Mettre à jour l'angle affiché
//     document.getElementById('qiblah-angle').innerText = `Angle : ${qiblahAngle.toFixed(2)}°`;
// }

import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';

let orientationListener = null ;
let currentQiblahAngle = 0;

export async function startQiblahCompass(latitude, longitude) {
  try {
    // Demander d'abord l'angle de la Qiblah
    await getQiblah(latitude, longitude);
    
    // Vérifier si le capteur est disponible
    const isAvailable = await Motion.isAvailable();
    if (!isAvailable) {
      throw new Error("Le capteur de mouvement n'est pas disponible");
    }

    // Démarrer la surveillance de l'orientation
    orientationListener = await Motion.addListener('orientation', (event) => {
      // event.alpha est l'angle par rapport au nord magnétique (0-360)
      const deviceAngle = event.alpha;
      
      // Calculer l'angle relatif de la Qiblah par rapport à l'orientation du téléphone
      const relativeQiblahAngle = (currentQiblahAngle - deviceAngle + 360) % 360;
      
      // Mettre à jour la flèche
      updateQiblahDirection(relativeQiblahAngle);
    });

    // Demander la permission d'utiliser le capteur
    await Motion.requestPermissions();

  } catch (error) {
    console.error("Erreur lors de l'initialisation de la boussole :", error);
  }
}

export async function stopQiblahCompass() {
  if (orientationListener) {
    orientationListener.remove();
    orientationListener = null;
  }
}

export async function getQiblah(latitude, longitude) {
  const apiUrl = `http://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    currentQiblahAngle = data.data.direction;
    console.log("angle Qiblah", currentQiblahAngle);
    document.getElementById('qiblah-angle')?.innerHTML = 
      `Direction de la Qiblah : ${currentQiblahAngle.toFixed(2)}°`;
    
    return currentQiblahAngle;
  } catch (error) {
    console.error('Erreur lors de la récupération de la direction de la Qiblah:', error);
    throw error;
  }
}

function updateQiblahDirection(angle) {
  const arrow = document.getElementById('direction-arrow');
  if (arrow) {
    // Rotation de la flèche
    arrow.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    // Mettre à jour l'angle affiché
    document.getElementById('qiblah-angle')?.innerText = 
      `Angle : ${angle.toFixed(2)}°`;
  }
}