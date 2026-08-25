import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB is connected")
    } catch (error) {
        console.log("mongodb error",error);
        process.exit(1);
    }
}
export default connectDB;