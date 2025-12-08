// rmok
import mongoose from 'mongoose';

const trailerSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  type: String,
  capacity: Number,
  status: { type: String, enum: ['disponible', 'en route', 'maintenance'], default: 'disponible' },
}, { timestamps: true });

export default mongoose.model('Trailer', trailerSchema);
