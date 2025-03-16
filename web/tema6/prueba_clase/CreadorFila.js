class CreadorFilas {

    constructor(controlador) {

        this.controlador = controlador;
        
        this.id = 0;

        this.fecha = new Date();

        this.estado = 0;
    }

    nuevaFila(descripcion) {
        let newFila = [];
        newFila.push(this.id);
        newFila.push(descripcion);
        newFila.push(this.fecha);
        newFila.push(this.estado);
        this.updateId();
        return newFila;
    }

    updateId(){
        ++this.id;
    }

}