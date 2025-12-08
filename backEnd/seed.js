import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Truck from './Models/Truck.js';
import FuelLog from './Models/FuelLog.js';
import Tire from './Models/Tire.js';
import Trailer from './Models/Trailer.js';
import Trip from './Models/Trip.js';
import User from './Models/User.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('✅ Connecté à MongoDB');

    // 🔹 Vider toutes les collections existantes
    await Truck.deleteMany();
    await Trailer.deleteMany();
    await Trip.deleteMany();
    await FuelLog.deleteMany();
    await Tire.deleteMany();
    await User.deleteMany();

    // 🔹 Créer un utilisateur driver
    const driver = await User.create({
      fullname: 'Driver Test',
      email: 'driver@test.com',
      password: '123456',
      role: 'driver',
    });

    // 🔹 Créer un camion
    const truck = await Truck.create({
      matricule: '123-ABC',
      marque: 'Volvo',
      carburantCapacity: 500,
    });

    // 🔹 Créer un trailer
    const trailer = await Trailer.create({
      matricule: 'TR-001',
      type: 'Remorque frigorifique',
      capacity: 10000,
    });

    // 🔹 Créer un trip
    const trip = await Trip.create({
      truck: truck._id,
      trailer: trailer._id,
      driver: driver._id,
      origin: 'Casablanca',
      destination: 'Rabat',
      date: new Date(),
    });

    // 🔹 Créer un fuel log
    await FuelLog.create({
      truck: truck._id,
      trip: trip._id,
      volume: 200,
      kilometrage: 1200,
    });

    // 🔹 Créer un pneu
    await Tire.create({
      truck: truck._id,
      position: 'avant gauche',
      etat: 'neuf',
      dateInstallation: new Date(),
    });

    console.log('🚀 Toutes les collections ont été créées avec des documents exemples !');
    await mongoose.connection.close();

  } catch (err) {
    console.error('❌ Erreur lors du seed:', err);
  }
};

seedDatabase();
