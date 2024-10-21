# Muslim Clock

Muslim Clock est une application simple et légère qui affiche l'heure en temps réel, les horaires de prière, et la météo en fonction de la position actuelle de l'utilisateur. Développée en **Vanilla JavaScript** avec **Webpack**, elle est compatible avec les environnements **desktop** et **mobile** (iOS via Capacitor).

## Fonctionnalités

- **Affichage de l'heure en temps réel** : L'heure est calculée avec précision en utilisant `performance.now()` pour garantir la mise à jour fluide et précise.
  
- **Prochaine prière** : Affiche la prochaine prière en fonction des horaires de prière calculés en fonction de la géolocalisation de l'utilisateur.

- **Horaires de prière** : Les horaires de prière pour la journée complète sont générés en fonction de la position géographique de l'utilisateur, avec mise à jour automatique selon la date et la position.

- **Météo en temps réel** : La météo locale (avec pictogrammes) est récupérée selon la position de l'utilisateur. Les pictogrammes changent selon le moment de la journée (matin/soir).

- **Compatibilité multi-plateforme** : Utilisation de **Capacitor** pour la compatibilité iOS avec une expérience fluide sur mobile et desktop.

## Installation

### Prérequis
- Node.js
- Capacitor CLI
- Xcode (pour iOS)

### Étapes d'installation

1. Clonez le dépôt :
```
git clone https://github.com/votre-utilisateur/muslim-clock.git
cd muslim-clock
  ```
2. Installez les dépendances :
```
npm install
```
3. Construisez le projet avec Webpack :	
```
npm run build
```
4. Déployez sur un simulateur ou un appareil iOS avec Capacitor :
```
npx cap sync
npx cap open ios
```

Utilisation

	•	Desktop : Ouvrez l’application dans n’importe quel navigateur compatible.
	•	Mobile iOS : Après avoir installé l’application via Xcode, elle est utilisable sur les appareils iOS.

Navigation

L’application comporte une barre de navigation en bas de page permettant d’accéder aux sections suivantes :

	•	Heure : Affichage central de l’heure en temps réel.
	•	Météo : Informations météorologiques locales.
	•	Horaires de prière : Horaires de toutes les prières de la journée avec indication de la prochaine prière.

Technologies utilisées

	•	Vanilla JavaScript : Code JavaScript sans framework pour une application légère.
	•	Webpack : Outil de build pour gérer les modules et les assets.
	•	Capacitor : Utilisé pour la compatibilité mobile iOS.
	•	HTML5/CSS3 : Structure et stylisation de l’interface utilisateur.
	•	API de géolocalisation : Utilisée pour récupérer la position de l’utilisateur.
	•	API météo : Pour afficher la météo en fonction de la localisation.

Améliorations futures

	•	Ajouter un backend pour stocker les préférences utilisateur.
	•	Support pour les notifications concernant la prière à venir.
	•	Optimisation de l’affichage pour les petits écrans.

Auteurs

	•	Keohavong Sirikone - Développeur principal.

License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.



 

