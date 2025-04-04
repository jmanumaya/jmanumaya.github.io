class Vista {
    constructor(controlador) {
        this.controlador = controlador;
        this.modal = document.getElementById("myModal");
        this.btn = document.getElementById("openModalBtn");
        this.pagina = 'jugador';
        this.btnAgregarJugador = document.getElementById("btn_crea_jugador");
        this.btnAgregarEquipo = document.getElementById("btn_crea_equipo");

        const botonesNavPrincipal = document.querySelectorAll('.btn_nav_principal');
        const visualizaJugadores = document.getElementById('visualiza-jugadores');
        const visualizaEquipos = document.getElementById('visualiza-equipos');

        // Evento para cambiar entre jugadores y equipos
        botonesNavPrincipal.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesNavPrincipal.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');
                const target = boton.dataset.target;
                if (target === 'jugadores') {
                    visualizaJugadores.style.display = 'flex';
                    visualizaEquipos.style.display = 'none';
                    this.pagina = 'jugador';
                } else {
                    visualizaJugadores.style.display = 'none';
                    visualizaEquipos.style.display = 'flex';
                    this.pagina = 'equipo';
                }
                this.renderizarVista();
            });
        });

        // Evento para abrir modal
        this.btn.addEventListener("click", () => {
            this.abreModalCrador();
            this.modal.style.display = "block";
        });

        // Cerrar al hacer clic fuera
        window.addEventListener("click", (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        });
    }

    abreModalCrador() {
        this.modal.innerHTML = '';
    
        this.modalContent = document.createElement("div");
        this.modalContent.classList.add("modal-content");
    
        this.span = document.createElement("span");
        this.span.classList.add("close");
        this.span.innerHTML = "&times;";
        this.span.addEventListener("click", () => {
            this.modal.style.display = "none";
        });
    
        const formulariosContainer = document.createElement("div");
    
        if (this.pagina === 'jugador') {
            const titulo = document.createElement("h3");
            titulo.textContent = "Introduce un Nuevo Jugador";
            titulo.classList.add("modal_titulo");
            formulariosContainer.appendChild(titulo);
        
            const formularioJugador = document.createElement("div");
            formularioJugador.classList.add("formulario", "modal-formulario");
            formularioJugador.innerHTML = `
                <form>
                    <label for="imp_nombre_jugador">Nombre del Jugador</label>
                    <input type="text" name="impNombre" id="imp_nombre_jugador" placeholder="Nombre">
                    <label for="imp_posicion_jugador">Posición del Jugador</label>
                    <input type="text" name="impPosicion" id="imp_posicion_jugador" placeholder="Posición">
                    <label for="imp_fecha_nacimiento">Fecha Nacimiento</label>
                    <input type="date" name="impFechaNacimiento" id="imp_fecha_nacimiento">
                    <button type="button" id="btn_crea_jugador">Crear Jugador</button>
                </form>
            `;
            formulariosContainer.appendChild(formularioJugador);
        } else {
            const titulo = document.createElement("h3");
            titulo.textContent = "Introduce un Nuevo Equipo";
            titulo.classList.add("modal_titulo");
            formulariosContainer.appendChild(titulo);
    
            const formularioEquipo = document.createElement("div");
            formularioEquipo.classList.add("formulario", "modal-formulario");
            formularioEquipo.innerHTML = `
                <form>
                    <label for="imp_nombre_equipo">Nombre del Equipo</label>
                    <input type="text" name="impNombreEquipo" id="imp_nombre_equipo">
                    <label for="imp_ciudad_equipo">Ciudad del Equipo</label>
                    <input type="text" name="impCiudadEquipo" id="imp_ciudad_equipo">
                    <label for="imp_nombre_estadio">Nombre del Estadio</label>
                    <input type="text" name="impNombreEstadio" id="imp_nombre_estadio">
                    <button type="button" id="btn_crea_equipo">Crear Equipo</button>
                </form>
            `;
            formulariosContainer.appendChild(formularioEquipo);
        }
    
        this.modalContent.appendChild(this.span);
        this.modalContent.appendChild(formulariosContainer);
        this.modal.appendChild(this.modalContent);
    
        if (this.pagina === 'jugador') {
            document.getElementById("btn_crea_jugador").addEventListener("click", () => {
                this.modal.style.display = "none";  
                console.log("Jugador creado");
            });
        } else {
            document.getElementById("btn_crea_equipo").addEventListener("click", () => {
                this.modal.style.display = "none";
                console.log("Equipo creado");
            });
        }
    }

    renderizarVista() {
        // Contenedor según la página activa
        const contenedor = this.pagina === 'jugador'
            ? document.getElementById("lista_de_jugadores")
            : document.getElementById("lista_de_equipos");
    
        // Limpiar contenido previo
        contenedor.innerHTML = '';
    
        // Obtener lista desde el controlador
        const lista = this.pagina === 'jugador'
            ? this.controlador.obtenerJugadores()  // Método del controlador que devuelve array de jugadores
            : this.controlador.obtenerEquipos();   // Método del controlador que devuelve array de equipos
    
        // Mostrar mensaje si no hay elementos
        if (lista.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.classList.add("mensaje-vacio");
            mensaje.textContent = this.pagina === 'jugador'
                ? "No hay jugadores registrados."
                : "No hay equipos registrados.";
            contenedor.appendChild(mensaje);
        } else {
            lista.forEach(obj => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");
        
                const img = document.createElement("img");
                img.src = "https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--55f53bed-0f8d-4d2f-9ced-587a20a8ca5e/_80x501____20.app.webp?preferwebp=true&width=288&height=384";
                img.alt = "";
                tarjeta.appendChild(img);
        
                if (this.pagina === 'jugador') {
                    const liNombre = document.createElement("li");
                    liNombre.classList.add("jugador");
                    if (obj instanceof Jugador) {
                        liNombre.textContent = obj.getNombre();
                    }
        
                    const liPosicion = document.createElement("li");
                    liPosicion.classList.add("posicion");
                    if (obj instanceof Jugador) {
                    liPosicion.textContent = obj.getPosicion();
                    }
        
                    const liNacimiento = document.createElement("li");
                    liNacimiento.classList.add("fecha_nacimiento");
                    if (obj instanceof Jugador) {
                    liNacimiento.textContent = obj.getFechaNacimiento();
                    }
        
                    const liEquipo = document.createElement("li");
                    liEquipo.classList.add("equipo");
                    if (obj instanceof Jugador) {
                    liEquipo.textContent = obj.getEquipo();
                    }
        
                    tarjeta.appendChild(liNombre);
                    tarjeta.appendChild(liPosicion);
                    tarjeta.appendChild(liNacimiento);
                    tarjeta.appendChild(liEquipo);
                } else {
                    const liEquipo = document.createElement("li");
                    liEquipo.classList.add("equipo");
                    if (objeto instanceof Equipo) {
                    liEquipo.textContent = objeto.getNombre();
                    }
        
                    const liCiudad = document.createElement("li");
                    liCiudad.classList.add("ciudad");
                    if (obj instanceof Equipo) {
                    liCiudad.textContent = obj.getCiudad();
                    }
                    const liEstadio = document.createElement("li");
                    liEstadio.classList.add("estadio");
                    if (obj instanceof Equipo) {
                    liEstadio.textContent = obj.getEstadio();
                    }
                        
                    tarjeta.appendChild(liEquipo);
                    tarjeta.appendChild(liCiudad);
                    tarjeta.appendChild(liEstadio);
                }
        
                contenedor.appendChild(tarjeta);
            });
        }
    }
}
