const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');

const app = express();
const PORT = 3000;

// Middleware obligatorio para procesar JSON
app.use(express.json());

// Enlace de la ruta base /incidencias
app.use('/incidencias', incidenciasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});