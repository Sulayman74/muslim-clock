

export async function getQiblah(latitude, longitude) {

    const apiUrl = `
http://api.aladhan.com/v1/qibla/${latitude}/${longitude}
    `

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const qiblahAngle = data.data.direction;
        console.log("angle Qiblah", qiblahAngle);

        document.getElementById('qiblah-angle').innerHTML = `Direction de la Qiblah : ${qiblahAngle.toFixed(2)}°`;
        updateQiblahDirection(qiblahAngle);

        // Ajoute ici du code pour orienter une flèche visuelle vers l'angle donné
    } catch (error) {
        console.error('Erreur lors de la récupération de la direction de la Qiblah:', error);
    }

}
function updateQiblahDirection(qiblahAngle) {
    const arrow = document.getElementById('direction-arrow');
    arrow.style.transform = `translate(-50%, -100%) rotate(${qiblahAngle}deg)`;

    // Mettre à jour l'angle affiché
    document.getElementById('qiblah-angle').innerText = `Angle : ${qiblahAngle.toFixed(2)}°`;
}

