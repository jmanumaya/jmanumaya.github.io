class EquipoModel {
  constructor() {
    if (localStorage.getItem("equipos") === null) {
      localStorage.setItem("equipos", JSON.stringify([]));
    } else {
      this.equipos = JSON.parse(localStorage.getItem("equipos"));
    }
  }

  agregarEquipo(equipo) {
    this.equipos.push(equipo);
    localStorage.setItem("equipos", JSON.stringify(this.equipos));
  }

  obtenerEquipos() {
    return this.equipos;
  }

  getEquipoPorID(id) {
    let equipo = null;
    this.equipos.forEach(element => {
      if (element.getId() === id) {
        equipo = element;
      }
    });
    return equipo;
  }

  getEquiposPorCiudad(ciudad) {
    let equiposCiudad = [];
    this.equipos.forEach(element => {
      if (element.getCiudad() === ciudad) {
        equiposCiudad.push(element);
      }
    });
    return equiposCiudad; // Devuelvo el array de equipos encontrados
  }

  getEquipoPorNombre(nombre) {
    let equipo = null;
    this.equipos.forEach(element => {
      if (element.getNombre() === nombre) {
        equipo = element;
      }
    });
    return equipo;
  }

  eliminarEquipo(id) {
    let equipo = this.getEquipoPorID(id);
    if (equipo !== null) {
      this.equipos.splice(this.equipos.indexOf(equipo), 1);
      localStorage.setItem("equipos", JSON.stringify(this.equipos)); // Guardamos la lista actualizada
    }
  }
}
