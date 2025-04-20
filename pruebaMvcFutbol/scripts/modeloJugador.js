class JugadorModel {
    constructor() {
        this.jugadores = [];
        this.nextId = 1;
    }

    agregarJugador(jugadorData) {
        const nuevoJugador = new Jugador(
            this.nextId++,
            jugadorData.nombre,
            jugadorData.posicion,
            jugadorData.fechaNacimiento,
            '', // Inicialmente sin equipo
            jugadorData.imagen ? URL.createObjectURL(jugadorData.imagen) : undefined // Simula la carga de imagen
        );
        this.jugadores.push(nuevoJugador);
        return nuevoJugador;
    }

    obtenerTodos() {
        return [...this.jugadores];
    }

    obtenerPorId(id) {
        return this.jugadores.find(jugador => jugador.getId() === parseInt(id));
    }

    buscar(termino) {
        const terminoLower = termino.toLowerCase();
        return this.jugadores.filter(jugador =>
            jugador.getNombre().toLowerCase().includes(terminoLower) ||
            jugador.getPosicion().toLowerCase().includes(terminoLower)
        );
    }

    eliminar(id) {
        this.jugadores = this.jugadores.filter(jugador => jugador.getId() !== parseInt(id));
    }

    asignarEquipo(jugadorId, equipoNombre) {
        const jugador = this.obtenerPorId(jugadorId);
        if (jugador) {
            jugador.setEquipo(equipoNombre);
            return true;
        }
        return false;
    }

    obtenerJugadoresDeEquipo(equipoNombre) {
        return this.jugadores.filter(jugador => jugador.getEquipo() === equipoNombre);
    }
}