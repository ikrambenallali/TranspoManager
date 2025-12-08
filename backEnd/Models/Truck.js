// camion
import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  marque: String,
  kilometrage: { type: Number, default: 0 },
  carburantCapacity: Number,
  status: { type: String, enum: ['disponible', 'en route', 'maintenance'], default: 'disponible' },
}, { timestamps: true });

export default mongoose.model('Truck', truckSchema);
