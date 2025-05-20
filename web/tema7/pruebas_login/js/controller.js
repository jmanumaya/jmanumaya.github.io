import Model from './model.js';
import View from './view.js';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Inicializar el observador de estado de autenticación de Firebase
        this.model.onAuthStateChanged((user) => {
            if (user) {
                // Usuario logueado
                this.view.mostrarLoggedInSection(user.email);
            } else {
                // Usuario deslogueado
                this.view.ocultarLoggedInSection();
            }
        });

        // Event Listeners para la UI
        this.view.elements.buttonInicioSesion.addEventListener('click', this.inicioSesion.bind(this));
        this.view.elements.buttonRegistro.addEventListener('click', this.registro.bind(this));
        this.view.elements.aRegister.addEventListener('click', this.mostrarFormRegistro.bind(this));
        this.view.elements.aLogin.addEventListener('click', this.mostrarFormInicioSesion.bind(this));
        this.view.elements.buttonCerrarSesion.addEventListener('click', this.cerrarSesion.bind(this));
    }

    mostrarFormRegistro() {
        this.view.mostrarFormRegistro();
    }

    mostrarFormInicioSesion() {
        this.view.mostrarFormInicioSesion();
    }

    async inicioSesion() {
        this.view.ocultarMensajes(); // Oculta mensajes anteriores
        const correo = this.view.elements.impEmailIs.value;
        const contrasena = this.view.elements.impPassIs.value;

        if (correo === "" || contrasena === "") {
            this.view.mostrarErrorLogin("Por favor, complete todos los campos.");
            return;
        } else if (!this.model.validarCorreo(correo)) {
            this.view.mostrarErrorLogin("El correo electrónico no es válido.");
            this.view.correoIncorrecto(this.view.elements.impEmailIs);
            return;
        }

        try {
            const user = await this.model.inicioSesion(correo, contrasena);
            if (user) {
                this.view.mostrarExitoLogin(`Inicio de sesión exitoso. Bienvenido ${user.usuario.split('@')[0]}`);
                // El observador onAuthStateChanged se encargará de actualizar la UI
            }
        } catch (error) {
            let errorMessage = "Ocurrió un error al iniciar sesión.";
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "El formato del correo electrónico no es válido.";
                    this.view.correoIncorrecto(this.view.elements.impEmailIs);
                    break;
                case 'auth/user-disabled':
                    errorMessage = "El usuario ha sido deshabilitado.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No existe un usuario con ese correo electrónico.";
                    this.view.correoIncorrecto(this.view.elements.impEmailIs);
                    break;
                case 'auth/wrong-password':
                    errorMessage = "La contraseña es incorrecta.";
                    this.view.passwordIncorrecta(this.view.elements.impPassIs);
                    break;
                default:
                    console.error("Error de inicio de sesión:", error.message);
                    break;
            }
            this.view.mostrarErrorLogin(errorMessage);
        }
    }

    async registro() {
        this.view.ocultarMensajes(); // Oculta mensajes anteriores
        const nombre = this.view.elements.impNombreRg.value;
        const apellido = this.view.elements.impApellidoRg.value;
        const usuario = this.view.elements.impUsuarioRg.value;
        const correo = this.view.elements.impEmailRg.value;
        const contrasena1 = this.view.elements.impPass1Rg.value;
        const contrasena2 = this.view.elements.impPass2Rg.value;

        if (nombre === "" || apellido === "" || usuario === "" || correo === "" || contrasena1 === "" || contrasena2 === "") {
            this.view.mostrarErrorRegister("Por favor, complete todos los campos.");
            return;
        } else if (!this.model.validarCorreo(correo)) {
            this.view.mostrarErrorRegister("El correo electrónico no es válido.");
            this.view.correoIncorrecto(this.view.elements.impEmailRg);
            return;
        } else if (!this.model.validarContrasena(contrasena1)) {
            this.view.mostrarErrorRegister("La contraseña debe tener al menos 6 caracteres."); // Firebase exige 6
            this.view.passwordIncorrecta(this.view.elements.impPass1Rg);
            return;
        } else if (contrasena1 !== contrasena2) {
            this.view.mostrarErrorRegister("Las contraseñas no coinciden.");
            this.view.passwordIncorrecta(this.view.elements.impPass2Rg);
            return;
        }

        try {
            const user = await this.model.registro(correo, contrasena1, { nombre, apellido, usuario });
            if (user) {
                this.view.mostrarFormInicioSesion(); // Redirige al formulario de login tras registro exitoso
                this.view.mostrarExitoLogin(`¡Registro exitoso! Ya puedes iniciar sesión con ${user.email}`);
                this.view.limpiarCamposFormRegistro(); // Limpia los campos del formulario de registro
            }
        } catch (error) {
            let errorMessage = "Ocurrió un error al registrar el usuario.";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "El correo electrónico ya está en uso.";
                    this.view.correoIncorrecto(this.view.elements.impEmailRg);
                    break;
                case 'auth/invalid-email':
                    errorMessage = "El formato del correo electrónico no es válido.";
                    this.view.correoIncorrecto(this.view.elements.impEmailRg);
                    break;
                case 'auth/weak-password':
                    errorMessage = "La contraseña es demasiado débil (debe tener al menos 6 caracteres).";
                    this.view.passwordIncorrecta(this.view.elements.impPass1Rg);
                    break;
                default:
                    console.error("Error de registro:", error.message);
                    break;
            }
            this.view.mostrarErrorRegister(errorMessage);
        }
    }

    async cerrarSesion() {
        try {
            await this.model.cerrarSesion();
            this.view.mostrarExitoLogin("Sesión cerrada exitosamente.");
            // onAuthStateChanged se encargará de actualizar la UI
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
            this.view.mostrarErrorLogin("Error al cerrar sesión: " + error.message);
        }
    }
}

export default Controller;