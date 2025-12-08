import dotenv from 'dotenv';
dotenv.config();
import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ msg: "User not found." })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({ msg: "User logged in successfully", token, user: { fullname: user.fullname, email: user.email, role: user.role }, })
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.log(error);
    }
}
export default { login };