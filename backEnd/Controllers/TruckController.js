import Truck from '../Models/Truck.js';

// create truck
export const createTruck = async (req, res, next) => {
    try {
        const { matricule, marque, kilometrage, carburantCapacity, status } = req.body;

        const existMatricule = await Truck.findOne({ matricule });
        if (existMatricule) {
            const error = new Error("This matricule already exists.");
            error.statusCode = 400;
            return next(error);
        }

        const newTruck = new Truck({
            matricule,
            marque,
            kilometrage,
            carburantCapacity,
            status,
        });

        await newTruck.save();

        res.status(201).json({
            msg: "Camion créé avec succès",
            truck: newTruck
        });

    } catch (error) {
        next(error); // middleware
    }
};


// fetch all trucks
export const getAllTrucks = async (req, res, next) => {
    try {
        const trucks = await Truck.find();
        res.status(200).json({
            success: true,
            msg: "Voici tous les camions",
            data: trucks
        });
    } catch (error) {
        next(error);
    }
};


// fetch truck by id 
export const getTruckById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const truck = await Truck.findById(id);
        if (!truck) {
            const error = new Error("Truck not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            msg: "Voici le camion",
            data: truck
        });

    } catch (error) {
        next(error);
    }
};


// delete truck 
export const deleteTruck = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleted = await Truck.findByIdAndDelete(id);
        if (!deleted) {
            const error = new Error("Truck not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            msg: "Camion supprimé avec succès",
            data: deleted
        });

    } catch (error) {
        next(error);
    }
};


// update truck
export const updateTruck = async (req, res, next) => {
    try {
        const id = req.params.id;

        const updated = await Truck.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            const error = new Error("Truck not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            msg: "Camion mis à jour avec succès",
            data: updated
        });

    } catch (error) {
        next(error);
    }
};

export default { createTruck, getAllTrucks, getTruckById, deleteTruck, updateTruck };
