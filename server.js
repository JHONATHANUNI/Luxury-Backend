// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());          // Permite que el frontend acceda
app.use(express.json());  // Para recibir JSON en requests

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente ✅");
});

// Aquí agregas tus rutas reales
// import authRoutes from "./routes/auth.js";
// app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
