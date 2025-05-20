// Asegúrate de obtener esta configuración desde tu consola de Firebase
// Ve a Configuración del proyecto > Tus aplicaciones > "Tu aplicación web"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6Hb5m__tBi_8D2_GQYN-cmPx5r6iN4wo", 
    authDomain: "joyagogamesprueba2.firebaseapp.com",
    projectId: "joyagogamesprueba2",
    storageBucket: "joyagogamesprueba2.firebasestorage.app",
    messagingSenderId: "544356837676",
    appId: "1:544356837676:web:9f0e4eab0e2cc06f996489",
    measurementId: "G-0F6MWE56QP"
};


// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth(); // Instancia del servicio de autenticación
const db = app.firestore(); // Instancia del servicio de Firestore (para guardar datos adicionales del usuario)

class Model {
    constructor() {
        this.auth = auth;
        this.db = db;
    }

    /**
     * Valida si un correo electrónico tiene un formato válido.
     * @param {string} email - El correo electrónico a validar.
     * @returns {boolean} - True si el correo es válido, false en caso contrario.
     */
    validarCorreo(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    /**
     * Valida si una contraseña cumple con los requisitos mínimos (ej. longitud).
     * Firebase por defecto requiere 6 caracteres para la contraseña.
     * @param {string} password - La contraseña a validar.
     * @returns {boolean} - True si la contraseña es válida, false en caso contrario.
     */
    validarContrasena(password) {
        return password.length >= 6; // Firebase exige un mínimo de 6 caracteres
    }

    /**
     * Inicia sesión de un usuario con correo y contraseña.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {Promise<firebase.User>} - Una promesa que resuelve con el objeto de usuario si el inicio de sesión es exitoso.
     * @throws {Error} - Si ocurre un error durante el inicio de sesión.
     */
    async inicioSesion(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Error al iniciar sesión en Firebase:", error.code, error.message);
            throw error; // Propaga el error para que el controlador lo maneje
        }
    }

    /**
     * Registra un nuevo usuario con correo y contraseña.
     * Opcionalmente, guarda datos adicionales en Firestore.
     * @param {string} email - El correo electrónico del nuevo usuario.
     * @param {string} password - La contraseña del nuevo usuario.
     * @param {object} userData - Datos adicionales del usuario (nombre, apellido, usuario).
     * @returns {Promise<firebase.User>} - Una promesa que resuelve con el objeto de usuario si el registro es exitoso.
     * @throws {Error} - Si ocurre un error durante el registro.
     */
    async registro(email, password, userData) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Guardar datos adicionales del usuario en Firestore (opcional)
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
            throw error; // Propaga el error para que el controlador lo maneje
        }
    }

    /**
     * Cierra la sesión del usuario actual.
     * @returns {Promise<void>} - Una promesa que se resuelve cuando la sesión ha sido cerrada.
     * @throws {Error} - Si ocurre un error al cerrar sesión.
     */
    async cerrarSesion() {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.error("Error al cerrar sesión en Firebase:", error.code, error.message);
            throw error; // Propaga el error
        }
    }

    /**
     * Observa cambios en el estado de autenticación del usuario.
     * @param {function(firebase.User|null)} callback - Función que se ejecuta cada vez que el estado de autenticación cambia.
     * Recibe el objeto de usuario (o null si no hay usuario logueado).
     */
    onAuthStateChanged(callback) {
        this.auth.onAuthStateChanged(callback);
    }
}

export default Model;