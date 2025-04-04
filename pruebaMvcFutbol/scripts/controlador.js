class Controlador {
    constructor() {
        this.modeloEquipo = null;
        this.modeloJugador = null;
        this.equipo = null;
        this.jugador = null;
        this.vista = null;
    }

    setModeloEquipo(modeloEquipo) {
        this.modeloEquipo = modeloEquipo;
    }

    setModeloJugador(modeloJugador) {
        this.modeloJugador = modeloJugador;
    }

    setEquipo(equipo) {
        this.equipo = equipo;
    }

    setJugador(jugador) {
        this.jugador = jugador;
    }

    setVista(vista) {
        this.vista = vista;

        const intervalJugador = setInterval(() => {
            const btnAgregarJugador = document.getElementById('btn_crea_jugador');
            if (btnAgregarJugador) {
                btnAgregarJugador.addEventListener("click", () => this.agregarJugador());
                clearInterval(intervalJugador); // Detenemos la comprobación
            }
        }, 100);

        const intervalEquipo = setInterval(() => {
            const btnAgregarEquipo = document.getElementById('btn_crea_equipo');
            if (btnAgregarEquipo) {
                btnAgregarEquipo.addEventListener("click", () => this.agregarEquipo());
                clearInterval(intervalEquipo); // Detenemos la comprobación
            }
        }, 100);
    }

    obtenerJugadores() {
        return this.modeloJugador.getPlayers(); // devuelve array
    }

    obtenerEquipos() {
        return this.modeloEquipo.obtenerEquipos(); // devuelve array
    }

    agregarJugador() {
        const nombre = document.getElementById("imp_nombre_jugador").value;
        const posicion = document.getElementById("imp_posicion_jugador").value;
        const nacimiento = document.getElementById("imp_fecha_nacimiento").value;

        if (nombre && posicion && nacimiento) {
            const jugador = new Jugador(nombre, posicion, nacimiento);
            this.modeloJugador.addPlayer(jugador);
            this.vista.renderizarVista();
        } else {
            alert("Por favor, completa todos los campos del jugador.");
        }
    }

    agregarEquipo() {
        const nombre = document.getElementById("imp_nombre_equipo").value;
        const ciudad = document.getElementById("imp_ciudad_equipo").value;
        const estadio = document.getElementById("imp_nombre_estadio").value;

        if (nombre && ciudad && estadio) {
            const equipo = new Equipo(nombre, ciudad, estadio);
            this.modeloEquipo.agregarEquipo(equipo);
            this.vista.renderizarVista();
        } else {
            alert("Por favor, completa todos los campos del equipo.");
        }
    }

    // Puedes implementar los siguientes más adelante
    asignarJugadorAEquipo(idJugador, idEquipo) {
        this.modeloJugador.asignarJugadorAEquipo(idJugador, idEquipo);
        this.vista.renderizarVista();
    }

    mostrarEstadisticas(idEquipo) {
        this.modeloEquipo.mostrarEstadisticas(idEquipo);
    }
}
