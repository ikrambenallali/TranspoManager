import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import errorHandler from './middlewares/errorHandling.js';



const app = express();
const port = process.env.PORT || 3000;

// Connexion à MongoDB
const uri = process.env.DB_URI;
mongoose.connect(uri) // <- plus besoin de options
.then(() => {
    console.log('✅ Connecté à MongoDB avec succès !');
    
    // Serveur seulement si la DB est connectée
    app.listen(port, () => {
        console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
    });
})
.catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
});
app.use(express.json());
console.log("JWT_SECRET =", process.env.JWT_SECRET);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// Middleware / Routes ici
app.get('/', (req, res) => {
    res.send('Hello World !');
});
app.use(errorHandler);
