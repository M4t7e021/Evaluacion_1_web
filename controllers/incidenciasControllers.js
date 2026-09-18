// funcion Estadísticas
const obtenerEstadisticas = (req, res) => {
  const estadisticas = incidencias.reduce((resultado, incidencia) => {
    resultado.totalIncidencias++;

    switch (incidencia.estado) {
      case "Pendiente":
        resultado.pendientes++;
        break;

      case "En Proceso":
        resultado.enProceso++;
        break;

      case "Resuelta":
        resultado.resueltas++;
        break;

      case "Cancelada":

        resultado.canceladas++;
        break;
    }

    return resultado;
  }, {
    totalIncidencias: 0,
    pendientes: 0,
    enProceso: 0,
    resueltas: 0,
    canceladas: 0
  });

  return res.status(200).json(estadisticas);
};


// funcion Clasificación Automática
const obtenerClasificacion = (req, res) => {
  const id = convertirId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      mensaje: "El id debe ser un numero entero positivo"
    });
  }

  const incidencia = buscarEnArreglo(incidencias, id);

  if (!incidencia) {
    return res.status(404).json({
      mensaje: "Incidencia no encontrada"
    });
  }

  let clasificacion = "";

  switch (incidencia.prioridad) {
    case "Alta":
      clasificacion = "Crítica";
      break;

    case "Media":
      clasificacion = "Importante";
      break;

    case "Baja":
      clasificacion = "Normal";
      break;

    default:
      return res.status(400).json({
        mensaje: "Prioridad inválida"
      });
  }

  return res.status(200).json({
    id: incidencia.id,
    clasificacion
  });
};

module.exports = {
  incidencias,
  listarIncidencias,
  registrarIncidencia,
  buscarIncidenciaPorId,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  obtenerClasificacion
};