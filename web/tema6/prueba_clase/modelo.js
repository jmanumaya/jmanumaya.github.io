class Modelo {
    constructor() {
        this.tareas = [];
    }

    setTarea(tarea) {
        this.tareas.push(tarea);
    }

    getTareas() {
        return this.tareas;
    }

    eliminaTarea(id) {

        this.tareas = this.tareas.filter(tarea => tarea.getId() !== id);
        
    }
}