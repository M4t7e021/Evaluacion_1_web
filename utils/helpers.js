// Prioridades permitidas
const PRIORIDADES_VALIDAS = ["Alta", "Media", "Baja"];

const esTextoValido = (valor) => {
  if (typeof valor !== "string") {
    return false;
  }

  if (valor.trim() === "") {
    return false;
  }

  return true;
};

// Validando la prioridad sin importar mayúsculas/minúsculas
const normalizarPrioridad = (prioridad) => {
  if (!esTextoValido(prioridad)) {
    return null;
  }

  const prioridadLimpia = prioridad.trim().toLowerCase();

  const encontrada = PRIORIDADES_VALIDAS.find((valida) => {
    return valida.toLowerCase() === prioridadLimpia;
  });

  return encontrada || null;
};

// Convierte el id (siempre string) a number
const convertirId = (idTexto) => {
  const id = Number(idTexto);

  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
};

const buscarEnArreglo = (arreglo, id) => {
  return arreglo.find((incidencia) => incidencia.id === id);
};

module.exports = {
  PRIORIDADES_VALIDAS,
  esTextoValido,
  normalizarPrioridad,
  convertirId,
  buscarEnArreglo
};