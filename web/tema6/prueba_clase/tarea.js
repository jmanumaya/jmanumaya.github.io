class Tarea {
    constructor(descripcion, id) {

        this.deshabilitada;
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = new Date().toLocaleDateString();
        this.checkbox = `<td><input type="checkbox"></td>`
        this.bottom = `<td><button id="btn-elimina" type="button" onclick="controlador.eliminaTarea(${this.id})">Eliminar</button></td>`

    }

    getId(){
        return this.id
    }

    getDescripcion(){
        return this.descripcion
    }

    getFecha(){
        return this.fecha
    }

    getCheckbox(){
        return this.checkbox
    }

    getBottom(){
        return this.bottom
    }
}