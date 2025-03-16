class Controlador {
    constructor(modelo, vista, creadorFila) {

        this.creadorFila = creadorFila;

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

        const fila = this.creadorFila.nuevaFila(this.descripcion, this.idCounter++);
        this.almacenaTarea(fila);
        this.actualizaVista();
    }

    almacenaTarea(fila) {
        this.modelo.setTarea(fila);
    }

    eliminaTarea(id) {
        this.modelo.eliminaTarea(id);

        this.actualizaVista();
    }

    activaTarea(id, checked) {
        this.actualizaVista(checked ? id : null);
    }

    actualizaVista(id) {
        const tareas = this.modelo.getTareas();
        
        this.vista.renderTareas(tareas, id);
    }
}