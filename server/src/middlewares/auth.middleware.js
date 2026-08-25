import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();

const protect = (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
export default protect;
