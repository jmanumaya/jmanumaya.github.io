class Controlador {

    constructor() {

        this.creadorFila = new CreadorFilas();
        this.modelo = new Modelo();
        this.vista = new Vista();
        this.btnCrear = document.getElementById('btn_enviar').addEventListener('click', () => {

            this.descripcion = $('#inpDescripcion').val();
            this.creaTarea();
        })

        this.actualizaVista();
    }

    creaTarea(){

        const fila = this.creadorFila.nuevaFila(this.descripcion);
        
        this.almacenaTarea(fila);

        this.actualizaVista();
    }

    almacenaTarea(fila){

        this.modelo.setTarea(fila);

    }

    actualizaVista(){

        const tareas = this.modelo.getTareas();
        this.vista.renderTareas(tareas);
    }

}

