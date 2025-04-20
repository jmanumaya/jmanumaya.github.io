class EquipoModel {
    constructor() {
        this.equipos = [];
        this.nextId = 1;
    }

    agregarEquipo(equipoData) {
        const nuevoEquipo = new Equipo(
            this.nextId++,
            equipoData.nombre,
            equipoData.ciudad,
            equipoData.estadio,
            equipoData.imagen ? URL.createObjectURL(equipoData.imagen) : undefined // Simula la carga de imagen
        );
        this.equipos.push(nuevoEquipo);
        return nuevoEquipo;
    }

    obtenerTodos() {
        return [...this.equipos];
    }

    obtenerPorId(id) {
        return this.equipos.find(equipo => equipo.getId() === parseInt(id));
    }

    buscar(termino) {
        const terminoLower = termino.toLowerCase();
        return this.equipos.filter(equipo =>
            equipo.getNombre().toLowerCase().includes(terminoLower) ||
            equipo.getCiudad().toLowerCase().includes(terminoLower) ||
            equipo.getEstadio().toLowerCase().includes(terminoLower)
        );
    }

    actualizar(equipoActualizado) {
        const index = this.equipos.findIndex(equipo => equipo.getId() === equipoActualizado.id);
        if (index !== -1) {
            this.equipos[index].setNombre(equipoActualizado.nombre);
            this.equipos[index].setCiudad(equipoActualizado.ciudad);
            this.equipos[index].setEstadio(equipoActualizado.estadio);
            return true;
        }
        return false;
    }

    eliminar(id) {
        this.equipos = this.equipos.filter(equipo => equipo.getId() !== parseInt(id));
    }
}
