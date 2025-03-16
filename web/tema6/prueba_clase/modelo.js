class Modelo {
    constructor(controlador) {

        this.controlador = controlador;

        this.tareas = [];
    }

    setTarea(tarea){

        this.tareas.push(tarea);
    }

    getTareas(){
        return this.tareas;
    }
}
