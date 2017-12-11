// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoiamNsb3BleiIsImEiOiJjamIwYjlteDI2eXQ0MzFucWp4MW9vb3pzIn0.6OuVAnCI1Zo1SIFW6huHcg'
  },
  firebase: {
    apiKey: "AIzaSyAD69-o9J9IGZ_S9Aguxq88CQyVX1e0qCA",
    authDomain: "mapbox-99de3.firebaseapp.com",
    databaseURL: "https://mapbox-99de3.firebaseio.com",
    projectId: "mapbox-99de3",
    storageBucket: "mapbox-99de3.appspot.com",
    messagingSenderId: "302912623567"
  }
};


