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
// Arreglo global en memoria y contador de ID
const { convertirId, buscarEnArreglo } = require("../utils/helpers");
const incidencias = [];
let contadorId = 1;

// GET /incidencias
const listarIncidencias = (req, res) => {
  return res.json(incidencias);
};

// POST /incidencias
const registrarIncidencia = (req, res) => {
  const { empleado, area, descripcion, prioridad } = req.body;

  // 1. Validar presencia de campos
  if (!empleado || !area || !descripcion || !prioridad) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  // 2. Validar que no sean cadenas vacías (.trim)
  if (!empleado.trim() || !area.trim() || !descripcion.trim() || !prioridad.trim()) {
    return res.status(400).json({ mensaje: "No se permiten cadenas vacías" });
  }

  // 3. Validar prioridad permitida ("Alta", "Media", "Baja")
  const prioVal = prioridad.trim().toLowerCase();
  let prioridadFormateada = "";

  if (prioVal === "alta") prioridadFormateada = "Alta";
  else if (prioVal === "media") prioridadFormateada = "Media";
  else if (prioVal === "baja") prioridadFormateada = "Baja";
  else {
    return res.status(400).json({ mensaje: "Prioridad solo puede ser: Alta, Media, Baja" });
  }

  // Crear objeto según requerimientos
  const nuevaIncidencia = {
    id: contadorId++,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: prioridadFormateada,
    estado: "Pendiente"
  };

  // Guardar en el arreglo global
  incidencias.push(nuevaIncidencia);

  return res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
};

// GET /incidencias/:id
const buscarIncidenciaPorId = (req, res) => {
  const id = convertirId(req.params.id);

  if (id === null) {
    return res.status(400).json({ mensaje: "El id debe ser un numero entero positivo" });
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
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
};

// 5. Cambiar Estado de Incidencia
const cambiarEstado = (req, res) => {
    const id = convertirid(req.params.id);

    if (id === null) {
        return res.status(400).json({ mensaje: "El id debe ser un numero entero positivo" });
    }

    const incidencia = buscarEnArreglo(incidencias, id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const { estado } = req.body;

    if (!estado || typeof estado !== 'string') {
        return res.status(400).json({ mensaje: "El campo estado es obligatorio y debe ser texto" });
    }

    const estadoLimPIO = estado.trim();
    let estadoValido = "";

    // Requisito: Uso obligatorio de Switch para los estados permitidos
    switch (estadoLimPIO) {
        case "Pendiente":
        case "En Proceso":
        case "Resuelta":
        case "Cancelada":
            estadoValido = estadoLimPIO;
            break;
        default:
            return res.status(400).json({ 
                mensaje: "Estado inválido. Los estados permitidos son: Pendiente, En Proceso, Resuelta, Cancelada" 
            });
    }

    incidencia.estado = estadoValido;

    return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia
    });
};

// 6. Eliminar Incidencia
const eliminarIncidencia = (req, res) => {
    const id = convertirid(req.params.id);

    if (id === null) {
        return res.status(400).json({ mensaje: "El id debe ser un numero entero positivo" });
    }

    // Requisito: Usar findIndex() para localizar la posición
    const index = incidencias.findIndex((inc) => inc.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    // Requisito: Usar splice() para eliminar el elemento del arreglo
    const incidenciaEliminada = incidencias.splice(index, 1);

    return res.status(200).json({
        mensaje: "Incidencia eliminada correctamente",
        incidencia: incidenciaEliminada[0]
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
  eliminarIncidencia
};