import express from 'express'
import { googleLogin, login, register } from '../controllers/authControllers.js';

const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/google-login", googleLogin);


export default router;