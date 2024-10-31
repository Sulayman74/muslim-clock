const moment = require("moment-hijri");
// Fonction pour mettre à jour la date dans les deux formats
export function updateDates() {
    moment.locale('fr-FR')
    const hijriDateFR = moment().format('iYYYY/iM/iD');


    // Date hégirienne
    moment.locale('ar-SA');
    const hijriDay = moment().format('dddd')
    const hijriDateAR = moment().format('iYYYY/iM/iD');
    // console.log(hijriDateFR, hijriDay, hijriDateAR);

    // Mettre à jour le contenu du conteneur
    document.getElementById('hijri-date-fr').textContent = `${hijriDateFR}`;
    document.getElementById('hijri-date').textContent = `${hijriDay}`;
}

