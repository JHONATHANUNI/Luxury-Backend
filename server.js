import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", // Frontend local Vite
    "https://luxury-a984s8gal-jhonathan-unis-projects.vercel.app" // Frontend en Vercel
  ]
}));
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando ✅");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));
