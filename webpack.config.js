const path = require('path');

module.exports = {
  // Le point d'entrée de ton application
  entry: './src/index.js', // ton fichier principal

  // Le fichier de sortie après le bundling
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'www'), // Répertoire de sortie
  },

  // Mode 'development' ou 'production'
  mode: 'development',

  // Configuration pour le serveur de développement Webpack
  devServer: {
    static: './www', // Dossier où se trouve ton fichier HTML
  },

  // Chargeur pour transpiler le JavaScript moderne
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Utilise Babel pour ES6+
          },
        },
      },
    ],
  },

  // Résolution des modules
  resolve: {
    extensions: ['.js'],
  },
};
 