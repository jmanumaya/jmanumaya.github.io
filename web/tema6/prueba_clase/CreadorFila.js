class CreadorFilas {
    constructor() {

    }

    nuevaFila(descripcion, id) {

        let newFila = [];

        newFila.push(id);
        newFila.push(descripcion);
        newFila.push(new Date());
        
        return newFila;

    }
}