class View {
    constructor() {
        this.elements = {
            iconIg: document.getElementById('iconIg'),
            titleIndex: document.getElementById('titleIndex'),
            textHeader: document.getElementById('textHeader'),
            formInicioSesion: document.querySelector('.cnt-formSesion'),
            formRegistro: document.querySelector('.cnt-formRegistro'),
            buttonInicioSesion: document.getElementById("buttonInicioSesion"),
            buttonRegistro: document.getElementById("buttonRegistro"),
            aRegister: document.getElementById("aRegister"),
            aLogin: document.getElementById("aLogin"),
            impEmailIs: document.getElementById("impEmail"), // Correo inicio sesión
            impPassIs: document.getElementById("impPass"),   // Contraseña inicio sesión
            impNombreRg: document.getElementById("impNombre"), // Nombre registro
            impApellidoRg: document.getElementById("impApellido"), // Apellido registro
            impUsuarioRg: document.getElementById("impUsuario"), // Usuario registro
            impEmailRg: document.getElementById("impEmailRg"), // Correo registro
            impPass1Rg: document.getElementById("impPass1"), // Contraseña 1 registro
            impPass2Rg: document.getElementById("impPass2"), // Contraseña 2 registro
            // Contenedores de información específicos para cada formulario
            contenedorInfoLogin: document.getElementById('cnt-InfoLogin'),
            contenedorInfoRegister: document.getElementById('cnt-InfoRegister'),
            // Elementos para la sección de usuario logueado
            loggedInSection: document.querySelector('.cnt-user-logged-in'),
            welcomeUserName: document.getElementById('welcomeUserName'),
            userEmail: document.getElementById('userEmail'),
            buttonCerrarSesion: document.getElementById('buttonCerrarSesion')
        };

        this.iconIgOriginal = 'resources/ig.png';
        this.iconIgHover = 'resources/ighover.png';

        // Mensajes de error/éxito para el formulario de Login
        this.mensajeErrorLogin = document.createElement('p');
        this.mensajeExitoLogin = document.createElement('p');
        this.configurarMensajes(this.mensajeErrorLogin, this.mensajeExitoLogin, this.elements.contenedorInfoLogin);

        // Mensajes de error/éxito para el formulario de Registro
        this.mensajeErrorRegister = document.createElement('p');
        this.mensajeExitoRegister = document.createElement('p');
        this.configurarMensajes(this.mensajeErrorRegister, this.mensajeExitoRegister, this.elements.contenedorInfoRegister);

        this.elements.iconIg.addEventListener('mouseover', () => {
            this.elements.iconIg.src = this.iconIgHover;
        });

        this.elements.iconIg.addEventListener('mouseout', () => {
            this.elements.iconIg.src = this.iconIgOriginal;
        });
    }

    configurarMensajes(errorElement, exitoElement, contenedor) {
        if (contenedor) {
            contenedor.appendChild(errorElement);
            contenedor.appendChild(exitoElement);
            errorElement.style.color = 'red';
            exitoElement.style.color = 'green';
            errorElement.style.marginTop = '10px';
            exitoElement.style.marginTop = '10px';
            errorElement.style.display = 'none';
            exitoElement.style.display = 'none';
        }
    }

    // Métodos para mostrar/ocultar formularios de login/registro
    mostrarFormRegistro() {
        this.elements.formInicioSesion.style.display = 'none';
        this.elements.formRegistro.style.display = 'block';
        this.elements.loggedInSection.style.display = 'none'; // Oculta sección de logueado
        this.elements.titleIndex.textContent = "Regístrate en Joyago Games";
        this.elements.textHeader.textContent = "Crea tu Cuenta en Joyago Games";
        this.ocultarMensajes(); // Oculta todos los mensajes al cambiar de formulario
        this.limpiarCamposFormRegistro(); // Limpia campos al cambiar
    }

    mostrarFormInicioSesion() {
        this.elements.formRegistro.style.display = 'none';
        this.elements.formInicioSesion.style.display = 'block';
        this.elements.loggedInSection.style.display = 'none'; // Oculta sección de logueado
        this.elements.titleIndex.textContent = "Bienvenido a Joyago Games";
        this.elements.textHeader.textContent = "Bienvenido a Joyago Games";
        this.ocultarMensajes(); // Oculta todos los mensajes al cambiar de formulario
        this.limpiarCamposFormLogin(); // Limpia campos al cambiar
    }

    // Métodos para mostrar mensajes de error/éxito en el formulario de Login
    mostrarErrorLogin(mensaje) {
        this.mensajeErrorLogin.textContent = mensaje;
        this.mensajeErrorLogin.style.display = 'block';
        this.mensajeExitoLogin.style.display = 'none';
    }

    mostrarExitoLogin(mensaje) {
        this.mensajeExitoLogin.textContent = mensaje;
        this.mensajeExitoLogin.style.display = 'block';
        this.mensajeErrorLogin.style.display = 'none';
    }

    // Métodos para mostrar mensajes de error/éxito en el formulario de Registro
    mostrarErrorRegister(mensaje) {
        this.mensajeErrorRegister.textContent = mensaje;
        this.mensajeErrorRegister.style.display = 'block';
        this.mensajeExitoRegister.style.display = 'none';
    }

    mostrarExitoRegister(mensaje) {
        this.mensajeExitoRegister.textContent = mensaje;
        this.mensajeExitoRegister.style.display = 'block';
        this.mensajeErrorRegister.style.display = 'none';
    }

    ocultarMensajes() {
        this.mensajeErrorLogin.textContent = "";
        this.mensajeExitoLogin.textContent = "";
        this.mensajeErrorLogin.style.display = 'none';
        this.mensajeExitoLogin.style.display = 'none';

        this.mensajeErrorRegister.textContent = "";
        this.mensajeExitoRegister.textContent = "";
        this.mensajeErrorRegister.style.display = 'none';
        this.mensajeExitoRegister.style.display = 'none';
    }

    correoIncorrecto(inputElement) {
        inputElement.classList.add('input-error');
        setTimeout(() => {
            inputElement.classList.remove('input-error');
        }, 1000);
    }

    passwordIncorrecta(inputElement) {
        inputElement.classList.add('input-error');
        setTimeout(() => {
            inputElement.classList.remove('input-error');
        }, 1000);
    }

    // Métodos para limpiar los campos de los formularios
    limpiarCamposFormLogin() {
        this.elements.impEmailIs.value = '';
        this.elements.impPassIs.value = '';
    }

    limpiarCamposFormRegistro() {
        this.elements.impNombreRg.value = '';
        this.elements.impApellidoRg.value = '';
        this.elements.impUsuarioRg.value = '';
        this.elements.impEmailRg.value = '';
        this.elements.impPass1Rg.value = '';
        this.elements.impPass2Rg.value = '';
    }

    // Métodos para mostrar/ocultar la sección de usuario logueado
    mostrarLoggedInSection(userEmail) {
        this.elements.formInicioSesion.style.display = 'none';
        this.elements.formRegistro.style.display = 'none';
        this.elements.loggedInSection.style.display = 'block';
        this.elements.userEmail.textContent = userEmail;
        this.elements.welcomeUserName.textContent = userEmail.split('@')[0]; // Simple nombre de usuario
        this.elements.titleIndex.textContent = "Mi Cuenta | Joyago Games";
        this.elements.textHeader.textContent = `Bienvenido, ${userEmail.split('@')[0]}`;
        this.ocultarMensajes();
    }

    ocultarLoggedInSection() {
        this.elements.loggedInSection.style.display = 'none';
        this.elements.formInicioSesion.style.display = 'block'; // Vuelve al formulario de login
        this.elements.titleIndex.textContent = "Bienvenido a Joyago Games";
        this.elements.textHeader.textContent = "Bienvenido a Joyago Games";
        this.ocultarMensajes();
    }
}

export default View;