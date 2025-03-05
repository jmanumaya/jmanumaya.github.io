class pepimodelo {

    enviarDatosServidor(datos, callback) {
        $.ajax({
            url: "https://lm.iesnervion.es/reto4.php",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function (respuesta) {
                callback(respuesta);
            },
            error: function () {
                alert("Error al enviar los datos al servidor.");
            }
        });
    }

    borrarDatosServidor(id, callback) {
        $.ajax({
            url: `https://lm.iesnervion.es/reto4.php?id=${id}`,
            method: "DELETE",
            contentType: "application/json",
            success: function (respuesta) {
                callback(respuesta);
            },
            error: function () {
                alert("Error al borrar los datos del servidor.");
            }
        });
    }

    obtenerDatosFormulario() {
        const descripcion = $("#inpDescripcion").val();
        const idProveedor = $("#inpIDProveedor").val();
        const precio = parseInt($("#inpPrecio").val(), 10);
        return { descripcion, idProveedor, precio };
    }

    validarDatosFormulario(datos) {
        if (!datos.descripcion || !datos.idProveedor || !datos.precio) {
            alert("Por favor rellena todos tus datos.");
            return false;
        }
        return true;
    }
}
