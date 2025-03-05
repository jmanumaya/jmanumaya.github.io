class pepivista {
    constructor(controlador) {
        this.controlador = controlador;
    }

    generarTabla(lista) {
        const $tablaBody = $("#tabla-body");
        $tablaBody.empty();
        lista.forEach((fila) => {
            $tablaBody.append(this.generarTR(fila));  // Usar 'this' para acceder a 'generarTR'
        });
    }

    generarTR(datos) {
        return `
            <tr id="tr_${datos.id}" onclick="this.controlador.borrarFila(${datos.id})">
                <td>${datos.id}</td>
                <td>${datos.descripcion}</td>
                <td>${datos.idProveedor}</td>
                <td>${datos.precio}</td>
            </tr>`;
    }

    mostrarRespuesta(respuesta) {
        if (respuesta === "") {
            alert("Últimos datos generados correctamente");
        } else {
            alert(respuesta);
        }
    }
}
