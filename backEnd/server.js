import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import truckRoutes from './Routes/truckRoute.js';
import trailerRoutes from './Routes/trailerRoute.js';   
import errorHandler from './middlewares/errorHandling.js';


import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/trailer', trailerRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Hello World !');
});



// Connexion Mongo + lancement du serveur
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('✅ Connecté à MongoDB');
        app.listen(port, () => console.log(`🚀 Serveur sur http://localhost:${port}`));
    })
    .catch(err => console.error('❌ Erreur MongoDB :', err));
app.use(errorHandler);
