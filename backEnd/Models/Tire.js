// pneus
import mongoose from 'mongoose';

const tireSchema = new mongoose.Schema({
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: false },
  trailer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trailer', required: false },
  position: String,
  etat: { type: String, enum: ['neuf', 'bon', 'usé', 'à remplacer'], default: 'bon' },
  dateInstallation: Date,
}, { timestamps: true });

export default mongoose.model('Tire', tireSchema);
