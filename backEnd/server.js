import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import truckRoutes from './Routes/truckRoute.js';
import trailerRoutes from './Routes/trailerRoute.js';
import tireRoutes from './Routes/tireRoutes.js';   
import fuelRoutes from './Routes/fuelRoutes.js';
import tripRoutes from './Routes/tripRoutes.js';
import maintenanceRuleRoutes from './Routes/maintenanceRuleRoutes.js';
import maintenanceRecordRoutes from './Routes/maintenanceRecordRoutes.js';
import errorHandler from './middlewares/errorHandling.js';
import "./listeners/maintenanceListener.js";
import notificationRoutes from "./Routes/notificationRoutes.js";




import cors from "cors";
import { isAdmin, isAuthenticated } from './middlewares/auth.js';

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
app.use('/api/users',isAuthenticated,isAdmin, userRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/trailer', trailerRoutes);
app.use('/api/tires', tireRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenanceRules', maintenanceRuleRoutes);
app.use('/api/maintenanceRecords', maintenanceRecordRoutes);
app.use("/api/notifications", notificationRoutes);


// Test route
app.get('/', (req, res) => {
    res.send('Hello World !');
});



app.use(errorHandler);
// Connexion Mongo + lancement du serveur
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('✅ Connecté à MongoDB');
        app.listen(port, () => console.log(`🚀 Serveur sur http://localhost:${port}`));
    })
    .catch(err => console.error('❌ Erreur MongoDB :', err));
