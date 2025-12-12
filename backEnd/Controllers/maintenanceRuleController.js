import MaintenanceRule from '../Models/MaintenanceRule.js';

// Create a new maintenance rule
export const createMaintenanceRule = async (req, res, next) => {
    try {
        const { target, intervalType, intervalValue, description } = req.body;

        const rule = new MaintenanceRule({
            target,
            intervalType,
            intervalValue,
            description
        });

        await rule.save();

        res.status(201).json({
            msg: "Maintenance rule created successfully",
            rule
        });
    } catch (error) {
        next(error); // pass error to error handler middleware
    }
};

// Get all maintenance rules
export const getMaintenanceRules = async (req, res, next) => {
    try {
        const rules = await MaintenanceRule.find().sort({ createdAt: -1 });
        res.status(200).json(rules);
    } catch (error) {
        next(error);
    }
};

// Get a single rule by ID
export const getMaintenanceRuleById = async (req, res, next) => {
    try {
        const rule = await MaintenanceRule.findById(req.params.id);

        if (!rule) {
            return res.status(404).json({ msg: "Maintenance rule not found" });
        }

        res.status(200).json(rule);
    } catch (error) {
        next(error);
    }
};

// Update maintenance rule
export const updateMaintenanceRule = async (req, res, next) => {
    try {
        const rule = await MaintenanceRule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!rule) {
            return res.status(404).json({ msg: "Maintenance rule not found" });
        }

        res.status(200).json({
            msg: "Maintenance rule updated successfully",
            rule
        });
    } catch (error) {
        next(error);
    }
};

// Delete maintenance rule
export const deleteMaintenanceRule = async (req, res, next) => {
    try {
        const rule = await MaintenanceRule.findByIdAndDelete(req.params.id);

        if (!rule) {
            return res.status(404).json({ msg: "Maintenance rule not found" });
        }

        res.status(200).json({ msg: "Maintenance rule deleted successfully" });
    } catch (error) {
        next(error);
    }
};
