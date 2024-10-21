//Permet de retrouver les horaires de prières selon la ville pareil lat long
export let prayerTimes = {};
export let nextPrayerName = '';

export async function getPrayerTimes(latitude, longitude) {
    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}`;

    await fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            prayerTimes = data.data.timings;
            displayPrayerTimes(prayerTimes);
            calculateTimeUntilNextPrayer(); 
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des heures de prière:', error);
        });
}

export function displayPrayerTimes(prayerTimes) {
    const prayerTimesHtml = `
        <h5>Heures de Prière</h5>
        <p class="prayer-name">Fajr : ${prayerTimes.Fajr}</p>
        <p class="prayer-name">Dhuhr : ${prayerTimes.Dhuhr}</p>
        <p class="prayer-name">Asr : ${prayerTimes.Asr}</p>
        <p class="prayer-name">Maghrib : ${prayerTimes.Maghrib}</p>
        <p class="prayer-name">Isha : ${prayerTimes.Isha}</p>
    `;
    document.getElementById('prayer-times').innerHTML = prayerTimesHtml;
}

// Permet de calculer le temps restant avant la prochaine prière
export function calculateTimeUntilNextPrayer() {
    const now = new Date();
    const currentTimeInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let nextPrayerTimeInSeconds = null;
    nextPrayerName = '';

    const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    for (const prayer of prayerNames) {
        const prayerTimeString = prayerTimes[prayer];

        if (prayerTimeString) {
            const [hours, minutes] = prayerTimeString.split(':').map(Number);
            const prayerTimeInSeconds = hours * 3600 + minutes * 60;

            if (prayerTimeInSeconds > currentTimeInSeconds) {
                nextPrayerTimeInSeconds = prayerTimeInSeconds;
                nextPrayerName = prayer;
                break;
            }
        }
    }

    if (nextPrayerTimeInSeconds !== null) {
        const timeUntilNextPrayer = nextPrayerTimeInSeconds - currentTimeInSeconds;
        const hoursUntilNextPrayer = Math.floor(timeUntilNextPrayer / 3600);
        const minutesUntilNextPrayer = Math.floor((timeUntilNextPrayer % 3600) / 60);
        const secondsUntilNextPrayer = timeUntilNextPrayer % 60;

        document.getElementById('time-until-prayer').innerHTML = `
            <p class="title-until-prayer">Temps jusqu'à la prochaine prière (${nextPrayerName}) :</p>
            <p class="counter-until-prayer">${hoursUntilNextPrayer} heures, ${minutesUntilNextPrayer} minutes et ${secondsUntilNextPrayer} secondes</p>
        `;
    } else {
        document.getElementById('time-until-prayer').innerHTML = `
            <h4>Toutes les prières pour aujourd'hui ont été effectuées.</h4>
        `;
    }
}