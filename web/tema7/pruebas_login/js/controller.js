class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.usuario = "";

        document.getElementById("buttonInicioSesion").onclick = async () => {
            await this.inicioSesion();
        }
        document.getElementById("buttonRegistro").onclick = async () => {
            await this.registro();
        }

        document.getElementById("aRegister").onclick = () => {
            this.view.mostrarFormRegistro();
        }
        document.getElementById("aLogin").onclick = () => {
            this.view.mostrarFormInicioSesion();
        }
    }

    async inicioSesion() {
        const correo = document.getElementById("impEmail").value;
        const contrasena = document.getElementById("impPass").value;
        if (correo === "" || contrasena === "") {
            this.view.mostrarError("Por favor, complete todos los campos.");
            return;
        } else if (!this.model.validarCorreo(correo)) {
            this.view.mostrarError("El correo electrónico no es válido.");
            this.view.correoIncorrecto();
            return;
        } else if (!this.model.validarContrasena(contrasena)) {
            this.view.mostrarError("La contraseña no es válida.");
            this.view.passwordIncorrecta();
            return;
        }
        try {
            this.usuario = await this.model.inicioSesion(correo, contrasena);
            this.view.mostrarExito(`Inicio de sesión exitoso. Bienvenido ${this.usuario}`);
            // Aquí podrías redirigir a la página principal del juego
        } catch (error) {
            this.view.mostrarError(`Error al iniciar sesión: ${error.message}`);
        }
    }

    async registro() {
        const nombre = document.getElementById("impNombre").value;
        const apellido = document.getElementById("impApellido").value;
        const usuario = document.getElementById("impUsuario").value;
        const correo = document.getElementById("impEmail").value;
        const contrasena1 = document.getElementById("impPass1").value;
        const contrasena2 = document.getElementById("impPass2").value;
        if (nombre === "" || apellido === "" || usuario === "" || correo === "" || contrasena1 === "" || contrasena2 === "") {
            this.view.mostrarError("Por favor, complete todos los campos.");
            return;
        } else if (!this.model.validarCorreo(correo)) {
            this.view.mostrarError("El correo electrónico no es válido.");
            this.view.correoIncorrecto();
            return;
        } else if (!this.model.validarContrasena(contrasena1)) {
            this.view.mostrarError("La contraseña no es válida.");
            this.view.passwordIncorrecta();
            return;
        } else if (contrasena1 !== contrasena2) {
            this.view.mostrarError("Las contraseñas no coinciden.");
            return;
        }
        try {
            const nuevoUsuario = await this.model.registro(nombre, apellido, usuario, correo, contrasena1);
            this.view.mostrarExito(`Registro Exitoso. Bienvenido ${nuevoUsuario}`);
            this.view.mostrarFormInicioSesion();
        } catch (error) {
            this.view.mostrarError(`Error al registrar usuario: ${error.message}`);
        }
    }
}