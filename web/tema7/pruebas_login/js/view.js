class View {
    constructor() {
        const iconIg = document.getElementById('iconIg');
        const iconIgOriginal = 'resources/ig.png';
        const iconIgHover = 'resources/ighover.png';

        this.nombreImput = document.getElementById("impNombre");
        this.apellidoImput = document.getElementById("impApellido");
        this.usuarioImput = document.getElementById("impUsuario");
        this.correoImput = document.getElementById("impEmail");
        this.pass1Imput = document.getElementById("impPass1");
        this.pass2Imput = document.getElementById("impPass2");

        this.titleIndex = document.getElementById('titleIndex');
        this.textHeader = document.getElementById('textHeader');

        this.formInicioSesion = document.querySelector('.cnt-formSesion');
        this.formRegistro = document.querySelector('.cnt-formRegistro');

        this.mensajeError = document.createElement('p');
        this.mensajeExito = document.createElement('p');

        const contenedorInfo = document.getElementById('cnt-Info');
        if (contenedorInfo) {
            contenedorInfo.appendChild(this.mensajeError);
            contenedorInfo.appendChild(this.mensajeExito);
            this.mensajeError.style.color = 'red';
            this.mensajeExito.style.color = 'green';
            this.mensajeError.style.marginTop = '10px';
            this.mensajeExito.style.marginTop = '10px';
            this.mensajeError.style.display = 'none';
            this.mensajeExito.style.display = 'none';
        }

        iconIg.addEventListener('mouseover', () => {
          iconIg.src = iconIgHover;
        });
      
        iconIg.addEventListener('mouseout', () => {
          iconIg.src = iconIgOriginal;
        });  
    }

    mostrarFormRegistro() {
        this.formInicioSesion.style.display = 'none';
        this.formRegistro.style.display = 'block';
        this.titleIndex.textContent = "Registrate en Joyago Games";
        this.textHeader.textContent = "Crea tu Cuenta en Joyago Games";
        this.ocultarMensaje();
    }

    mostrarFormInicioSesion() {
        this.formRegistro.style.display = 'none';
        this.formInicioSesion.style.display = 'block';
        this.titleIndex.textContent = "Bienvenido a Joyago Games";
        this.textHeader.textContent = "Bienvenido a Joyago Games";
        this.ocultarMensaje();
    }

    mostrarError(mensaje) {
        this.mensajeError.textContent = mensaje;
        this.mensajeError.style.display = 'block';
        this.mensajeExito.style.display = 'none';
    }

    mostrarExito(mensaje) {
        this.mensajeExito.textContent = mensaje;
        this.mensajeExito.style.display = 'block';
        this.mensajeError.style.display = 'none';
    }

    ocultarMensaje() {
        this.mensajeError.textContent = "";
        this.mensajeExito.textContent = "";
    }

    correoIncorrecto() {
        this.emailInput.classList.add('input-error');
        setTimeout(() => {
            this.emailInput.classList.remove('input-error');
        }, 1000);
    }

    passwordIncorrecta() {
        this.pass1Imput.classList.add('input-error');
        setTimeout(() => {
            this.pass1Imput.classList.remove('input-error');
        }, 1000);
    }
}