class JugadorModel {
    constructor() {
        if (localStorage.getItem("jugadores") === null) {
            localStorage.setItem("jugadores", JSON.stringify([]));
        } else {
            this.jugadores = JSON.parse(localStorage.getItem("jugadores"));
        }
    }

    getPlayers() {
        return this.jugadores;
    }

    addPlayer(nombre, posicion, fechaNacimiento) {
        // Aseguramos que la variable player está declarada
        const player = new Jugador(this.jugadores.length, nombre, posicion, fechaNacimiento);
        this.jugadores.push(player);
        this.addPlayerLocalStorage(player);
    }

    addPlayerLocalStorage(jugador) {
        this.jugadores.push(jugador);
        localStorage.setItem("jugadores", JSON.stringify(this.jugadores));
    }

    añadirEquipo(id, idEquipo) {
        // Asegurarse de que la clase Jugador tenga el método setIdEquipo()
        this.jugadores.forEach(element => {
            if (element.getId() === id) {
                element.setIdEquipo(idEquipo); // Este método debe estar implementado en la clase Jugador
            }
        });
    }

    removePlayer(id) {
        let e = this.getPlayerByID(id);
        if (e !== null) {
            this.jugadores.splice(this.jugadores.indexOf(e), 1);
            this.removePlayerLocalStorage(id);
        }
    }

    removePlayerLocalStorage(id) {
        this.removePlayer(id);
        localStorage.setItem("jugadores", JSON.stringify(this.jugadores));
    }

    getPlayerByName(nombre) {
        let e = null;
        this.jugadores.forEach(element => {
            if (element.getNombre() === nombre) {
                e = element;
            }
        });
        return e;
    }

    getPlayerByID(id) {
        let e = null;
        this.jugadores.forEach(element => {
            if (element.getId() === id) {
                e = element;
            }
        });
        return e;
    }

    getPlayersOfTeam(idEquipo) {
        let equipo = [];
        this.jugadores.forEach(element => {
            if (element.getIdEquipo() === idEquipo) {
                equipo.push(element);
            }
        });
        return equipo;
    }
}
