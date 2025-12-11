// Journal de carburant lwa9od
import mongoose from 'mongoose';

const fuelLogSchema = new mongoose.Schema({
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: false },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // qui a fait le plein
  date: { type: Date, default: Date.now },
  volume: { type: Number, required: true }, // litres
  kilometrageDepart: { type: Number },
  kilometrageArrivee: { type: Number },
  remarques: { type: String , required: false , default: "no remarks" },
}, { timestamps: true });

export default mongoose.model('FuelLog', fuelLogSchema);
