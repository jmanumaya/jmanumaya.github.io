class Vista {
    constructor(controlador) {

        this.controlador = controlador

        this.tabla = document.getElementById('tabla-body');
    }

    renderTareas(tareas){

        this.tabla.innerHTML = '';
        tareas.forEach(tarea => { 
            this.tabla.appendChild(this.generaTr(tarea));
        });
    }

    generaTr(tarea) {
        const datos = this.obtenerDatos(tarea);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${datos.id}</td>
            <td>${datos.descripcion}</td>
            <td>${datos.fecha}</td>
            <td>${datos.estado}</td>
        `;
        return tr;
    }

    obtenerDatos(tarea){
        return { id: tarea[0], descripcion: tarea[1], fecha: tarea[2], estado: tarea[3] };
    }

}
