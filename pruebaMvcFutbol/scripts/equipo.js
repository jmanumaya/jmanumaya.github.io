class Equipo {
    constructor(id, nombre, ciudad, estadio, imagen = 'img/default_equipo.png') {
        this.id = id;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.estadio = estadio;
        this.imagen = imagen;
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    getCiudad() {
        return this.ciudad;
    }

    getEstadio() {
        return this.estadio;
    }

    getImagen() {
        return this.imagen;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setCiudad(ciudad) {
        this.ciudad = ciudad;
    }

    setEstadio(estadio) {
        this.estadio = estadio;
    }

    setImagen(imagen) {
        this.imagen = imagen;
    }
}