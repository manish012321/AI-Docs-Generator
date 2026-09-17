import User from "../models/user.js";
import Workspace from "../models/workspace.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "user already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const workspace = await Workspace.create({
            name: `${name}'s Workspace`,
            members: []
        })
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role: "viewer",
            workspaceId: workspace._id

        });
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
        res.status(500).json({ message: "register error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Wrong email or password" });
        }
         // login for Google
        if (existingUser.authProvider === "google") {
            return res.status(400).json({
                message: "This account uses Google Sign-In. Please log in with Google."
            });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong email or password" })
        }

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
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "login error" })
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) {
            return res.status(400).json({ message: "Access required" });
        }

      
        const googleRes = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const { email, name, picture } = googleRes.data;

        let user = await User.findOne({ email });

        if (!user) {
            // new user — create workspace + user, same as register flow
            const workspace = await Workspace.create({
                name: `${name}'s Workspace`,
                members: []
            });

            user = await User.create({
                name,
                email,
                avatar: picture,
                authProvider: "google",
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
            user: {
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