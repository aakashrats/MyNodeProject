let mix = require('laravel-mix');






mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss','public/css/app.css');

// module.exports = {
//     // ...other configuration options...
//     resolve: {
//       extensions: ['.*', '.wasm', '.mjs', '.js', '.jsx', '.json'],
//       // other resolve options...
//     },
//     // ...other configuration options...
//   };
  
mix.babelConfig({

    "plugins": ["@babel/plugin-proposal-class-properties"]
});