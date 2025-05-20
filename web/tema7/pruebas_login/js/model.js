const firebaseConfig = {
    apiKey: "AIzaSyD6Hb5m__tBi_8D2_GQYN-cmPx5r6iN4wo", 
    authDomain: "joyagogamesprueba2.firebaseapp.com",
    projectId: "joyagogamesprueba2",
    storageBucket: "joyagogamesprueba2.firebasestorage.app",
    messagingSenderId: "544356837676",
    appId: "1:544356837676:web:9f0e4eab0e2cc06f996489",
    measurementId: "G-0F6MWE56QP"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth(); // Instancia del servicio de autenticación
const db = app.firestore(); // Instancia del servicio de Firestore (para guardar datos adicionales del usuario)

class Model {
    constructor() {
        this.auth = auth;
        this.db = db;
    }

    validarCorreo(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    validarContrasena(password) {
        return password.length >= 6; // creo que exige un mínimo de 6 caracteres
    }

    async inicioSesion(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Error al iniciar sesión en Firebase:", error.code, error.message);
            throw error;
        }
    }

    async registro(email, password, userData) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await this.db.collection('users').doc(user.uid).set({
                nombre: userData.nombre,
                apellido: userData.apellido,
                usuario: userData.usuario,
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp() // Marca de tiempo del registro
            });

            return user;
        } catch (error) {
            console.error("Error al registrar usuario en Firebase:", error.code, error.message);
            throw error;
        }
    }

    async cerrarSesion() {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.error("Error al cerrar sesión en Firebase:", error.code, error.message);
            throw error;
        }
    }

    onAuthStateChanged(callback) {
        this.auth.onAuthStateChanged(callback);
    }
}

export default Model;