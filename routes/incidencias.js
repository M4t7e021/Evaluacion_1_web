const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasControllers');

router.get('/', controller.listarIncidencias);
router.post('/', controller.registrarIncidencia);
router.get('/:id', controller.buscarIncidenciaPorId);
router.put('/:id/estado', controller.cambiarEstado);
router.delete('/:id', controller.eliminarIncidencia);

// (AÚN SIN IMPLEMENTAR, POR ESO LO DEJE COMENTADO)
// router.get('/estadisticas', controller.obtenerEstadisticas);
// router.get('/:id/clasificacion', controller.obtenerClasificacion);

module.exports = router;