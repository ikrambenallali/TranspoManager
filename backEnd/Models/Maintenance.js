//  planifier et suivre l’entretien des camions, remorques et pneus pour éviter les pannes et contrôler les coûts.
import mongoose from 'mongoose';

const maintenanceRuleSchema = new mongoose.Schema({
  type: { type: String, enum: ['pneu', 'vidange', 'revision'], required: true },
  interval: { type: Number, required: true }, // en km ou jours selon le type
  description: String,
}, { timestamps: true });

export default mongoose.model('MaintenanceRule', maintenanceRuleSchema);
