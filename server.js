// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());           // Permite que tu frontend acceda al backend
app.use(express.json());   // Para poder recibir JSON en requests

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente ✅');
});

// Aquí podrías agregar tus rutas reales, por ejemplo:
// const treatmentRoutes = require('./routes/treatments');
// app.use('/api/treatments', treatmentRoutes);

// Puerto dinámico para Vercel
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
