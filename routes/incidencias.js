const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasControllers');

router.get('/', controller.listarIncidencias);
router.post('/', controller.registrarIncidencia);

router.get('/estadisticas', controller.obtenerEstadisticas);
router.get('/:id/clasificacion', controller.obtenerClasificacion);

router.get('/:id', controller.buscarIncidenciaPorId);
router.put('/:id/estado', controller.cambiarEstado);
router.delete('/:id', controller.eliminarIncidencia);

module.exports = router;