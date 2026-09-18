const { convertirId, buscarEnArreglo } = require("../utils/helpers");
// Arreglo global en memoria y contador de ID
const incidencias = [];
let contadorId = 1;

// 3. GET /incidencias (Listar incidencias)
const listarIncidencias = (req, res) => {
  return res.json(incidencias);
};

// 2. POST /incidencias (Registrar incidencia)
const registrarIncidencia = (req, res) => {
  const { empleado, area, descripcion, prioridad } = req.body;

  // 1. Validar presencia de campos
  if (!empleado || !area || !descripcion || !prioridad) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  // 2. Validar cadenas vacías (.trim)
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

  const nuevaIncidencia = {
    id: contadorId++,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: prioridadFormateada,
    estado: "Pendiente"
  };

  incidencias.push(nuevaIncidencia); // Uso de push()
  return res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
};

// 4. GET /incidencias/:id (Buscar incidencia por ID)
const buscarIncidenciaPorId = (req, res) => {
  const id = convertirId(req.params.id);

  if (id === null) {
    return res.status(400).json({ mensaje: "El id debe ser un numero entero positivo" });
  }

  const incidencia = buscarEnArreglo(incidencias, id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
};

// 5. PUT /incidencias/:id/estado (Cambiar estado)
const cambiarEstado = (req, res) => {
  const id = convertirId(req.params.id);

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

  const estadoLimpio = estado.trim();
  let estadoValido = "";

  // Requisito obligatorio: Uso de switch
  switch (estadoLimpio) {
    case "Pendiente":
    case "En Proceso":
    case "Resuelta":
    case "Cancelada":
      estadoValido = estadoLimpio;
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

// 6. DELETE /incidencias/:id (Eliminar incidencia)
const eliminarIncidencia = (req, res) => {
  const id = convertirId(req.params.id);

  if (id === null) {
    return res.status(400).json({ mensaje: "El id debe ser un numero entero positivo" });
  }

  // Requisito obligatorio: Uso de findIndex y splice
  const index = incidencias.findIndex((inc) => inc.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  const incidenciaEliminada = incidencias.splice(index, 1);

  return res.status(200).json({
    mensaje: "Incidencia eliminada correctamente",
    incidencia: incidenciaEliminada[0]
  });
};

// 7. GET /estadisticas (Estadísticas generales)
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

// 8. GET /incidencias/:id/clasificacion (Clasificación automática)
const obtenerClasificacion = (req, res) => {
  const id = convertirId(req.params.id);

  if (id === null) {
    return res.status(400).json({ mensaje: "El id debe ser un numero entero positivo" });
  }

  const incidencia = buscarEnArreglo(incidencias, id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  let clasificacion = "";

  // Requisito obligatorio: Uso de switch para la clasificación
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
      return res.status(400).json({ mensaje: "Prioridad inválida" });
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