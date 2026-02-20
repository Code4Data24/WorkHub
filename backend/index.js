import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
 
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS Policy Error: Origin not allowed"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected successfully."))
  .catch((err) => console.error("Failed to connect to DB:", err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to TaskHub API" });
});

app.use("/api-v1", routes);

app.use((err, req, res, next) => {
  if (err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});