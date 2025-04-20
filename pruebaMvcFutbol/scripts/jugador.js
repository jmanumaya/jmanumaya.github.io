class Jugador {
    constructor(id, nombre, posicion, fechaNacimiento, equipo = '', imagen = 'img/default_jugador.png') {
        this.id = id;
        this.nombre = nombre;
        this.posicion = posicion;
        this.fechaNacimiento = fechaNacimiento;
        this.equipo = equipo;
        this.imagen = imagen;
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    getPosicion() {
        return this.posicion;
    }

    getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    getEquipo() {
        return this.equipo;
    }

    getImagen() {
        return this.imagen;
    }

    setEquipo(equipo) {
        this.equipo = equipo;
    }

    setImagen(imagen) {
        this.imagen = imagen;
    }
}