import User from "../models/user.js";
import Workspace from "../models/workspace.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
import { Resend } from "resend";
import { saveOTP, verifyOTP } from "../utils/otpStore.js";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

//REGISTER — send OTP 
export const register = async (req, res) => {
    try {
        const { name, email } = req.body;

        // 1. Check if email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Verify email via Abstract API
        let emailCheck;
        try {
            const response = await fetch(
                `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`
            );
            emailCheck = await response.json();
        } catch (err) {
            return res.status(503).json({ message: "Unable to verify email right now, please try again later" });
        }

        if (emailCheck.deliverability === "UNDELIVERABLE") {
            return res.status(400).json({ message: "Please use a valid email address" });
        }

        if (emailCheck.is_disposable_email?.value === true) {
            return res.status(400).json({ message: "Disposable emails are not allowed" });
        }

        // 3. Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 4. Save OTP in memory
        saveOTP(email, otp);

        // 5. Send OTP email
        try {
            await resend.emails.send({
                from: "AI Docs Generator <onboarding@resend.dev>",
                to: email,
                subject: "Your OTP Code",
                html: `
                    <h2>Verify your email</h2>
                    <p>Hi ${name}, your OTP code is:</p>
                    <h1 style="letter-spacing: 4px;">${otp}</h1>
                    <p>This code expires in <b>2 minutes</b>.</p>
                `
            });
        } catch (err) {
            return res.status(503).json({ message: "Failed to send OTP email, please try again" });
        }

        return res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Register error" });
    }
};

//  VERIFY OTP — create user 
export const verifyOtp = async (req, res) => {
    try {
        const { name, email, otp } = req.body;

        // 1. Verify OTP
        const result = verifyOTP(email, otp);

        if (result === "NOT_FOUND") {
            return res.status(400).json({ message: "OTP not found, please register again" });
        }
        if (result === "EXPIRED") {
            return res.status(400).json({ message: "OTP expired, please register again" });
        }
        if (result === "INVALID") {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // 2. Create Workspace + User
        const workspace = await Workspace.create({
            name: `${name}'s Workspace`,
            members: []
        });

        const newUser = await User.create({
            name,
            email,
            role: "viewer",
            workspaceId: workspace._id
        });

        // 3. Sign JWT
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role, workspaceId: newUser.workspaceId },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(201).json({
            token,
            User: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                workspaceId: newUser.workspaceId
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Verification error" });
    }
};

// LOGIN — send OTP 
export const login = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "No account found with this email" });
        }

        // 2. Block Google accounts from OTP login
        if (existingUser.authProvider === "Google") {
            return res.status(400).json({ message: "This account uses Google Sign-In. Please log in with Google." });
        }

        // 3. Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 4. Save OTP in memory
        saveOTP(email, otp);

        // 5. Send OTP email
        try {
            await resend.emails.send({
                from: "AI Docs Generator <onboarding@resend.dev>",
                to: email,
                subject: "Your Login OTP Code",
                html: `
                    <h2>Login Verification</h2>
                    <p>Hi ${existingUser.name}, your OTP code is:</p>
                    <h1 style="letter-spacing: 4px;">${otp}</h1>
                    <p>This code expires in <b>2 minutes</b>.</p>
                `
            });
        } catch (err) {
            return res.status(503).json({ message: "Failed to send OTP email, please try again" });
        }

        return res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login error" });
    }
};

//VERIFY LOGIN OTP 
export const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1. Verify OTP
        const result = verifyOTP(email, otp);

        if (result === "NOT_FOUND") {
            return res.status(400).json({ message: "OTP not found, please login again" });
        }
        if (result === "EXPIRED") {
            return res.status(400).json({ message: "OTP expired, please login again" });
        }
        if (result === "INVALID") {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // 2. Get user
        const existingUser = await User.findOne({ email });

        // 3. Sign JWT
        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role, workspaceId: existingUser.workspaceId },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            token,
            User: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                workspaceId: existingUser.workspaceId
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Verification error" });
    }
};

// GOOGLE LOGIN 
export const googleLogin = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) {
            return res.status(400).json({ message: "Access token required" });
        }

        const googleRes = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const { email, name, picture } = googleRes.data;

        let user = await User.findOne({ email });

        if (!user) {
            const workspace = await Workspace.create({
                name: `${name}'s Workspace`,
                members: []
            });

            user = await User.create({
                name,
                email,
                avatar: picture,
                authProvider: "Google",
                role: "viewer",
                workspaceId: workspace._id
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, workspaceId: user.workspaceId },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            token,
            User: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                workspaceId: user.workspaceId
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Google login failed" });
    }
};