import FuelLog from '../Models/FuelLog.js';
import MaintenanceRecord from '../Models/MaintenanceRecord.js';
import Trip from '../Models/Trip.js';
import Truck from '../Models/Truck.js';
import maintenanceEmitter from "../utils/maintenanceEmitter.js";


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
// update truck
export const updateTruck = async (req, res, next) => {
    try {
        const id = req.params.id;

        const oldTruck = await Truck.findById(id);
        if (!oldTruck) {
            const error = new Error("Truck not found");
            error.statusCode = 404;
            return next(error);
        }

        // sauvegarde de l'ancien kilométrage
        const oldKm = oldTruck.kilometrage;

        const updated = await Truck.findByIdAndUpdate(id, req.body, { new: true });

        // 🔥 Vérifier si le kilométrage a été changé
        if (req.body.kilometrage && req.body.kilometrage !== oldKm) {
            maintenanceEmitter.emit("check_maintenance", {
                targetType: "truck",
                targetId: updated._id,
                currentKm: req.body.kilometrage
            });
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


// rapport
export const getFleetReport = async (req, res, next) => {
  try {
    const trucks = await Truck.find();

    const report = await Promise.all(
      trucks.map(async (truck) => {
        const trips = await Trip.find({ truck: truck._id });

        const totalKilometrage = trips.reduce((sum, trip) => {
          if (trip.kilometrageDepart != null && trip.kilometrageArrivee != null) {
            return sum + (trip.kilometrageArrivee - trip.kilometrageDepart);
          }
          return sum;
        }, 0);
// console.log(totalKilometrage);
const totalFuel = await FuelLog.aggregate([
  { $match: { truck: truck._id } },
  { $group: { _id: null, total: { $sum: "$volume" } } } // <-- ici, volume au lieu de quantity
]);

  const maintenanceCount = await MaintenanceRecord.countDocuments({
  targetType: 'truck',
  targetId: truck._id
});


        return {
          truckId: truck._id,
          matricule: truck.matricule,
          totalKilometrage,
          totalFuel: totalFuel[0]?.total || 0,
          maintenanceCount
        };
      })
    );

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export default { createTruck, getAllTrucks, getTruckById, deleteTruck, updateTruck ,getFleetReport };
