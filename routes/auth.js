// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();

const USERS_PATH = path.join(__dirname, "data", "users.json");

// Leer base de datos
function readUsers() {
  const data = fs.readFileSync(USERS_PATH, "utf8");
  return JSON.parse(data);
}

// Guardar base de datos
function saveUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

// REGISTER (demo sin encriptar)
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ msg: "El usuario ya existe" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password, // solo para pruebas; en producción debería ir encriptada
  };

  users.push(newUser);
  saveUsers(users);

  res.json({ msg: "Usuario registrado correctamente" });
});

// LOGIN (demo sin encriptar)
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ msg: "Usuario no encontrado" });
  }

  if (password !== user.password) {
    return res.status(400).json({ msg: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secretKey123",
    { expiresIn: "2h" }
  );

  res.json({ msg: "Login exitoso", token });
});

export default router;
