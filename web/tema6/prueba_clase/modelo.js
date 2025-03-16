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

    eliminaTarea(id){

        const index = this.tareas.findIndex(tarea => tarea[0] === id);
            if (index !== -1) {
                this.tareas.splice(index, 1);
            }
    }
}
