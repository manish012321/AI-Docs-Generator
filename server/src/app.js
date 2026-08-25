import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import sopRouter from './routes/sopRoutes.js';
import { contactRoute } from './routes/contactRoute.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/sops", sopRouter);
app.post("/api/contact", contactRoute);

app.get('/', (req, res) => {
    res.json({ message: 'SOP API running' });
});

export default app;