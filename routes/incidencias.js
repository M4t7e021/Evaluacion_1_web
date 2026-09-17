const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasControllers');

router.get('/', controller.listarIncidencias);
router.post('/', controller.registrarIncidencia);
router.get('/:id', controller.buscarIncidenciaPorId);

// (AÚN SIN IMPLEMENTAR, POR ESO LO DEJE COMENTADO)
// router.get('/estadisticas', controller.obtenerEstadisticas);
// router.put('/:id/estado', controller.cambiarEstado);
// router.delete('/:id', controller.eliminarIncidencia);
// router.get('/:id/clasificacion', controller.obtenerClasificacion);

module.exports = router;