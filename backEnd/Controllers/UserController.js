import dotenv from 'dotenv';
dotenv.config();
import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { generatePassword } from '../utils/passwordUtils.js';
import { sendMail } from '../services/emailService.js';



const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';



// create user 
export const createDriver = async (req, res) => {
    try {
        const { fullname, email ,role } = req.body;
        
        const ExestingEmail = await User.findOne({ email })
        if (ExestingEmail) {
            return res.status(400).json({ msg: "This email already exists." })
        }

        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();

        
        await sendMail(email, "Votre compte chauffeur", 
            `Bonjour ${fullname},\n\nVotre compte a été créé.\nEmail: ${email}\nMot de passe: ${password}\nMerci de changer votre mot de passe après la première connexion.`
        );
        
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({ msg: "User registered successfully", token, user: { fullname: newUser.fullname, email: newUser.email, role: newUser.role }, })
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.log(error);

    }
}

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ msg: "All users", users });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}
export default { createDriver , getAllUsers };