import express from 'express'
import { googleLogin, login, register, verifyOtp, verifyLoginOtp } from '../controllers/authControllers.js';

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/verify-login-otp", verifyLoginOtp);
router.post("/google-login", googleLogin);

export default router;