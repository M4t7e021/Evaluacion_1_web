// Arreglo global en memoria y contador de ID
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
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  return res.status(200).json(incidencia);
};

module.exports = {
  incidencias,
  listarIncidencias,
  registrarIncidencia,
  buscarIncidenciaPorId
};