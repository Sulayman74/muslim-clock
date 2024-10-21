// api-adresse data.gouv.fr pour retrouver selon la lat long
export async function getCity(latitude, longitude) {
    const apiUrl = `https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}`;

    await fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const city = data.features[0].properties.city || data.features[0].properties.label;
                document.getElementById('city').innerHTML = `<p> ${city}</p>`;
            } else {
                document.getElementById('city').innerHTML = `<h3>Ville : Non trouvée</h3>`;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la ville:', error);
        });
}