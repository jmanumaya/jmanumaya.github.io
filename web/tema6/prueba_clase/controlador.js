class Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.idCounter = 0;
        this.btnCrear = document.getElementById('btn_enviar').addEventListener('click', () => {
            this.descripcion = $('#inpDescripcion').val();
            this.creaTarea();
        });

        this.actualizaVista();
    }

    creaTarea() {
        const ta = new Tarea(this.descripcion, this.idCounter++)
        this.almacenaTarea(ta);
        this.actualizaVista();
    }

    almacenaTarea(tarea) {
        this.modelo.setTarea(tarea);
    }

    eliminaTarea(id) {
        this.modelo.eliminaTarea(id);
        this.actualizaVista();
    }

    actualizaVista(id) {
        const tareas = this.modelo.getTareas();
        this.vista.renderTareas(tareas, id);
    }
}