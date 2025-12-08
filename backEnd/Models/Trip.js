//trajets
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: String,
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  trailer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trailer', required: false },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startLocation: String,
  endLocation: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['à faire', 'en cours', 'terminé'], default: 'à faire' },
  kilometrageDepart: Number,
  kilometrageArrivee: Number,
  carburantDepart: Number,
  carburantArrivee: Number,
  remarks: { type: String ,required: false},
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
