// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import docsRouter from "./routes/generateDoc.routes.js";
import {contactRoute}  from "./routes/contactRoute.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean),
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "2mb" }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/generate-docs", docsRouter);
app.post("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.json({ message: "Generate Docs API running" });
});

export default app;