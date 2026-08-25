import User from "../models/user.js";
import Workspace from "../models/workspace.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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