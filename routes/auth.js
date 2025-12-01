import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// "Base de datos" en memoria temporal
let users = [
  {
    id: 1,
    email: "admin@test.com",
    password: "1234",
  },
];

// REGISTER (demo sin encriptar)
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ msg: "El usuario ya existe" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password, // solo para pruebas
  };

  users.push(newUser);

  res.json({ msg: "Usuario registrado correctamente" });
});

// LOGIN (demo sin encriptar)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

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
