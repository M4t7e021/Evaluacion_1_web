const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController');

// Tus dos endpoints asignados
router.get('/', controller.listarIncidencias);
router.post('/', controller.registrarIncidencia);

// Conexión con los endpoints que desarrollarán tus compañeros
router.get('/estadisticas', controller.obtenerEstadisticas);
router.get('/:id', controller.buscarIncidenciaPorId);
router.put('/:id/estado', controller.cambiarEstado);
router.delete('/:id', controller.eliminarIncidencia);
router.get('/:id/clasificacion', controller.obtenerClasificacion);

module.exports = router;