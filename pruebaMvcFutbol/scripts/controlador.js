class Controlador {
    constructor() {
        this.vista = null;
        this.equipoModelo = null;
        this.jugadorModelo = null;
    }

    setVista(vista) {
        this.vista = vista;
    }

    setModeloEquipo(equipoModelo) {
        this.equipoModelo = equipoModelo;
    }

    setModeloJugador(jugadorModelo) {
        this.jugadorModelo = jugadorModelo;
    }

    agregarJugadorDesdeVista(jugadorData) {
        const nuevoJugador = this.jugadorModelo.agregarJugador(jugadorData);
        this.vista.renderizarVista(nuevoJugador);
    }

    mostrarJugadores() {
        this.vista.limpiarListaJugadores();
        const jugadores = this.jugadorModelo.obtenerTodos();
        if (jugadores.length === 0) {
            this.vista.mostrarMensajeVacio('jugador');
        } else {
            jugadores.forEach(jugador => this.vista.renderizarVista(jugador));
        }
    }

    obtenerParaModalJugadores(jugadorId) {
        const jugador = this.jugadorModelo.obtenerPorId(jugadorId);
        if (jugador) {
            const equipo = this.equipoModelo.obtenerTodos().find(e => e.getNombre() === jugador.getEquipo());
            this.vista.mostrarModalJugador(jugador, equipo);
        } else {
            this.vista.mostrarError("No se encontró el jugador.");
        }
    }

    eliminarJugador(jugadorId) {
        this.jugadorModelo.eliminar(jugadorId);
        this.vista.actualizarVista();
        this.vista.mostrarSuccess("Jugador eliminado con éxito.");
    }

    agregarEquipoDesdeVista(equipoData) {
        const nuevoEquipo = this.equipoModelo.agregarEquipo(equipoData);
        this.vista.renderizarVista(nuevoEquipo);
    }

    mostrarEquipos() {
        this.vista.limpiarListaEquipos();
        const equipos = this.equipoModelo.obtenerTodos();
        if (equipos.length === 0) {
            this.vista.mostrarMensajeVacio('equipo');
        } else {
            equipos.forEach(equipo => this.vista.renderizarVista(equipo));
        }
    }

    obtenerParaModalEquipos(equipoId) {
        const equipo = this.equipoModelo.obtenerPorId(equipoId);
        if (equipo) {
            const jugadoresDelEquipo = this.jugadorModelo.obtenerJugadoresDeEquipo(equipo.getNombre());
            this.vista.mostrarModalEquipo(equipo, jugadoresDelEquipo);
        } else {
            this.vista.mostrarError("No se encontró el equipo.");
        }
    }

    eliminarEquipo(equipoId) {
        this.equipoModelo.eliminar(equipoId);
        this.vista.actualizarVista();
        this.vista.mostrarSuccess("Equipo eliminado con éxito.");
    }

    buscar(termino) {
        return {
            jugadores: this.jugadorModelo.buscar(termino),
            equipos: this.equipoModelo.buscar(termino)
        };
    }

    asignarEquipoAJugador(jugadorId, equipoNombre) {
        if (this.jugadorModelo.asignarEquipo(jugadorId, equipoNombre)) {
            this.vista.actualizarVista();
            this.vista.mostrarSuccess(`Jugador asignado a ${equipoNombre}.`);
        } else {
            this.vista.mostrarError("No se pudo asignar el equipo al jugador.");
        }
    }

    obtenerEquipos() {
        return this.equipoModelo.obtenerTodos();
    }

    actualizarEquipo(equipoActualizado) {
        if (this.equipoModelo.actualizar(equipoActualizado)) {
            this.vista.actualizarVista();
            this.vista.mostrarSuccess("Equipo actualizado con éxito.");
        } else {
            this.vista.mostrarError("No se pudo actualizar el equipo.");
        }
    }
}