import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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

// Middleware / Routes ici
app.get('/', (req, res) => {
    res.send('Hello World !');
});
