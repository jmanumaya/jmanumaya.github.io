class controlador {
    constructor() {
        this.modelo = new pepimodelo();
        this.vista = new pepivista();

        // Enlazamos el evento del botón de enviar en el constructor
        $("#btn_enviar").on("click", this.enviar.bind(this));  // Usamos .bind(this) para mantener el contexto
    }

    enviar() {
        const datos = this.modelo.obtenerDatosFormulario();
        if (!this.modelo.validarDatosFormulario(datos)) return;
        this.modelo.enviarDatosServidor(datos, (respuesta) => {
            this.vista.mostrarRespuesta(respuesta.error);
            this.vista.generarTabla(respuesta.lista);
        });
    }

    borrarFila(id) {
        this.modelo.borrarDatosServidor(id, (respuesta) => {
            this.vista.mostrarRespuesta(respuesta.error);
            this.vista.generarTabla(respuesta.lista);
        });
    }
}
