import MaintenanceRecord from '../Models/MaintenanceRecord.js';
import MaintenanceRule from '../Models/MaintenanceRule.js';
import Tire from '../Models/Tire.js';
import Trailer from '../Models/Trailer.js';
import Truck from '../Models/Truck.js';

// Create a new maintenance record
export const createMaintenanceRecord = async (req, res, next) => {
    try {
        const { targetType, targetId, rule, description, kmAtMaintenance } = req.body;

        // Validate rule existence
        const ruleExists = await MaintenanceRule.findById(rule);
        if (!ruleExists) {
            return res.status(404).json({ msg: "Maintenance rule not found" });
        }

        const record = new MaintenanceRecord({
            targetType,
            targetId,
            rule,
            description,
            kmAtMaintenance,
        });

        await record.save();

        res.status(201).json({
            msg: "Maintenance record saved successfully",
            record
        });

    } catch (error) {
        next(error);
    }
};

// Get all maintenance records
export const getMaintenanceRecords = async (req, res, next) => {
  try {
    const records = await MaintenanceRecord.find()
      .populate("rule")
      .sort({ performedAt: -1 })
      .lean(); // lean pour transformer en objet JS

    // Ajouter le matricule de la cible
    const recordsWithMatricule = await Promise.all(
      records.map(async (rec) => {
        let targetDoc = null;
        if (rec.targetType === "truck") {
          targetDoc = await Truck.findById(rec.targetId).select("matricule");
        } else if (rec.targetType === "trailer") {
          targetDoc = await Trailer.findById(rec.targetId).select("matricule");
        } else if (rec.targetType === "tire") {
          targetDoc = await Tire.findById(rec.targetId).select("position");
        }

        return {
          ...rec,
          targetMatricule: targetDoc ? targetDoc.matricule : "N/A"
        };
      })
    );

    res.status(200).json(recordsWithMatricule);
  } catch (error) {
    next(error);
  }
};

// Get maintenance records for a specific target
export const getRecordsByTarget = async (req, res, next) => {
    try {
        const { targetType, targetId } = req.params;

        const records = await MaintenanceRecord.find({ targetType, targetId })
            .populate("rule")
            .sort({ performedAt: -1 });

        res.status(200).json(records);
    } catch (error) {
        next(error);
    }
};

// Delete a maintenance record
export const deleteMaintenanceRecord = async (req, res, next) => {
    try {
        const record = await MaintenanceRecord.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: "Maintenance record not found" });
        }

        res.status(200).json({ msg: "Maintenance record deleted successfully" });
    } catch (error) {
        next(error);
    }
};
