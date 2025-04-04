class Jugador {
    constructor(nombre, posicion, fechaNacimien) {
        this.nombre = nombre;
        this.posicion = posicion;
        
        this.fechaNacimiento = this.textoAFecha(fechaNacimien);
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

    getIdEquipo() {
        return this.idEquipo;
    }

    getEdad() {
        const fechaActual = new Date();
        let year = fechaActual.getFullYear() - this.fechaNacimiento.getFullYear();
        return year;
    }

    setPosicion(posicion) {
        this.posicion = posicion;
    }

    setIdEquipo(idEquipo) {
       this.idEquipo = idEquipo;
    }

    textoAFecha(fechaNacimien){
        // Suponiendo que la fechaNacimiento está en el formato "DD/MM/YYYY"
        let partesFecha = fechaNacimien.split('/');
        let day = parseInt(partesFecha[0], 10); // Día
        let month = parseInt(partesFecha[1], 10) - 1; // Mes (restamos 1 porque los meses comienzan en 0)
        let year = parseInt(partesFecha[2], 10); // Año
        return new Date(year, month, day); // Devuelve un objeto Date
    }

    fechaATexto(fecha){
        let year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();
        return `${day}/${month}/${year}`;
    }
}
