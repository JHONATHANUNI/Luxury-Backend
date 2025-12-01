import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://luxury-tdm.vercel.app", // dominio de tu frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("API Cars Luxury funcionando 🚀");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
