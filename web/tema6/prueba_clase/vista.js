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

    generaTr(tarea, id) {

        const datos = this.obtenerDatos(tarea);
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${datos.id}</td>
            <td>${datos.descripcion}</td>
            <td>${datos.fecha}</td>
            <td><input type="checkbox" ${datos.id === id ? 'checked' : ''} onchange="controlador.activaTarea(${datos.id}, this.checked)"></td>
            <td><button id="btn-elimina" type="button" onclick="controlador.eliminaTarea(${datos.id})">Eliminar</button></td>
        `;
        return tr;
    }

    obtenerDatos(tarea) {
        return { id: tarea[0], descripcion: tarea[1], fecha: tarea[2] };
    }
}