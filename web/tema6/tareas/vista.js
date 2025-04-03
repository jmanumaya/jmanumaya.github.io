class Vista {
    constructor(controlador) {
        this.controlador = controlador;
        this.tabla = document.getElementById('tabla-body');
        this.trCabecera = document.getElementById('tr-cabecera');
    }

    renderTareas(tareas, id) {
        this.trCabecera.innerHTML = `
            <th>ID</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Elimina</th>
        `;

        this.tabla.innerHTML = '';
        tareas.forEach(tarea => {
            this.tabla.appendChild(this.generaTr(tarea, id));
        });
    }

    generaTr(tarea) {
        const datos = this.obtenerDatos(tarea);
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${datos.id}</td>
            <td>${datos.descripcion}</td>
            <td>${datos.fecha}</td>
            ${datos.checkbox}
            ${datos.bottom}
        `;
        return tr;
    }

    obtenerDatos(tarea) {
        return { id: tarea.getId(), descripcion: tarea.getDescripcion(), fecha: tarea.getFecha(), checkbox: tarea.getCheckbox(), bottom: tarea.getBottom() };
    }
}