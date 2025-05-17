const firebaseConfig = {
    apiKey: "AIzaSyAvVyojsk0QzssdN87waT0US4z9DjnVIZ4",
    authDomain: "joyagogamesprueba.firebaseapp.com",
    projectId: "joyagogamesprueba",
    storageBucket: "joyagogamesprueba.firebasestorage.app",
    messagingSenderId: "809445650131",
    appId: "1:809445650131:web:1370a79f48983f4ab6ae26",
    measurementId: "G-41MDEE68CV"
};

class Model{

    constructor(){
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    async inicioSesion(correo, contrasena) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, correo, contrasena);
            return userCredential.user.displayName || userCredential.user.email;
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            throw error;
        }
    }

    async registro(nombre, apellido, usuario, correo, contrasena) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, correo, contrasena);
            await updateProfile(userCredential.user, {
                displayName: usuario
            });
            await setDoc(doc(collection(this.db, "usuarios"), userCredential.user.uid), {
                nombre: nombre,
                apellido: apellido,
                usuario: usuario,
                correo: correo
            });
            return usuario;
        } catch (error) {
            console.error("Error al registrar usuario:", error.message);
            throw error;
        }
    }

    validarCorreo(correo) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    }

    validarContrasena(contrasena) {
        return contrasena.length >= 6;
    }

}