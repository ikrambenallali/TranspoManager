import Trip from "../Models/Trip.js";

// create trip 
export const createTrip = async (req, res, next) => {
    try {
        const { truck, trailer, driver, startLocation, endLocation, startDate, endDate, status,kilometrageDepart,kilometrageArrivee ,carburantDepart ,carburantArrivee,remarks } = req.body;
        const newTrip = new Trip({
            truck,
            trailer,
            driver,
            startLocation,
            endLocation,
            startDate,
            endDate,
            status,
            kilometrageDepart,
            kilometrageArrivee,
            carburantDepart,
            carburantArrivee,
            remarks
        });
        await newTrip.save();
        res.status(201).json({ msg: "Trip created successfully", success: true, data: newTrip });
    } catch (error) {
        next(error);
    }
};

// get all trips
export const getAllTrips = async (req, res, next) => {
    try {   
        const trips = await Trip.find();
        res.status(200).json({ msg: "Here are all the trips", success: true, data: trips });
    } catch (error) {
        next(error);
    }
};

// get trip by id
export const getTripById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const trip = await Trip.findById(id);
        if (!trip) {
            const error = new Error("Trip not found");
            error.statusCode = 404;
            return next(error);
        }   
        res.status(200).json({ msg: "Trip found", success: true, data: trip });
    } catch (error) {
        next(error);
    }
};

// update trip
export const updateTrip = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTrip) {
            const error = new Error("Trip not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ msg: "Trip updated successfully", success: true, data: updatedTrip });
    } catch (error) {
        next(error);
    }
};

// delete trip
export const deleteTrip = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedTrip = await Trip.findByIdAndDelete(id);
        if (!deletedTrip) {
            const error = new Error("Trip not found");  
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ msg: "Trip deleted successfully", success: true, data: deletedTrip });
    } catch (error) {
        next(error);
    }
};
