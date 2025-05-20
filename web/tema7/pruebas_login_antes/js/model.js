class Model{

    constructor(){
        const firebaseConfig = {

            apiKey: "AIzaSyAvVyojsk0QzssdN87waT0US4z9DjnVIZ4",

            authDomain: "joyagogamesprueba.firebaseapp.com",

            projectId: "joyagogamesprueba",

            storageBucket: "joyagogamesprueba.firebasestorage.app",

            messagingSenderId: "809445650131",

            appId: "1:809445650131:web:1370a79f48983f4ab6ae26",

            measurementId: "G-41MDEE68CV"

        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
    }
}