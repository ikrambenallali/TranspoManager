// Journal de carburant lwa9od
import mongoose from 'mongoose';

const fuelLogSchema = new mongoose.Schema({
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: false },
  date: { type: Date, default: Date.now },
  volume: Number, // en litres
  kilometrage: Number,
}, { timestamps: true });

export default mongoose.model('FuelLog', fuelLogSchema);
