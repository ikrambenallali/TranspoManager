import FuelLog from '../Models/FuelLog.js';

// create FuelLog 
export  const createFuelLog = async (req, res, next) => {
    try {
        const { truck, trailer, driver, date, volume, kilometrageDepart, kilometrageArrivee, remarques } = req.body;

        const newFuelLog = new FuelLog({
            truck,
            trailer,
            driver,
            date,
            volume,
            kilometrageDepart,
            kilometrageArrivee,
            remarques
        });

        await newFuelLog.save();

        res.status(201).json({
            msg: "FuelLog créé avec succès",
            success: true,
            data: newFuelLog
        });

    } catch (error) {
        next(error);
    }
}

// get all FuelLogs
export const getAllFuelLogs = async (req, res, next) => {
    try {
        const fuelLogs = await FuelLog.find();
        res.status(200).json({
            msg: "Liste de tous les FuelLogs",
            success: true,
            data: fuelLogs
        });

    } catch (error) {
        next(error);
    }
}

// get FuelLog by id 
export const getFuelLogById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fuelLog = await FuelLog.findById(id);

        if (!fuelLog) {
            const error = new Error("FuelLog not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            msg: "FuelLog trouvé",
            success: true,
            data: fuelLog
        });

    } catch (error) {
        next(error);
    }
}

// update FuelLog
export const updateFuelLog = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedFuelLog = await FuelLog.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedFuelLog) {
            const error = new Error("FuelLog not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            msg: "FuelLog mis à jour",
            success: true,
            data: updatedFuelLog
        });

    } catch (error) {
        next(error);
    }
}

// delete FuelLog 
export const deleteFuelLog = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await FuelLog.findByIdAndDelete(id);

        if (!deleted) {
            const error = new Error("FuelLog not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            msg: "FuelLog supprimé",
            success: true,
            data: deleted
        });

    } catch (error) {
        next(error);
    }
}
