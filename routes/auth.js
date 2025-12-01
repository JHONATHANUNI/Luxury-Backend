import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Usuario fijo
const FIXED_USER = {
  id: 1,
  email: "admin@test.com",
  password: "1234", // contraseña plana
};

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== FIXED_USER.email) {
    return res.status(400).json({ msg: "Usuario no encontrado" });
  }

  if (password !== FIXED_USER.password) {
    return res.status(400).json({ msg: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    { id: FIXED_USER.id, email: FIXED_USER.email },
    process.env.SECRET_KEY || "miClaveSecreta",
    { expiresIn: "4h" }
  );

  res.json({ msg: "Login exitoso", token });
});

export default router;
