import Trip from "../Models/Trip.js";

const adminFields = [
    "title",
    "truck",
    "trailer",
    "driver",
    "startLocation",
    "endLocation",
    "startDate",
    "status",
    "kilometrageDepart",
    "carburantDepart",
    "remarks"
];
const driverFields = [
    "kilometrageArrivee",
    "carburantArrivee",
    "endDate",
    "status",
    "remarks"
];
// pour filtrer les champs selon le role
const filterFields = (data, allowedFields) => {
    let filtered = {};
    Object.keys(data).forEach(key => {
        if (allowedFields.includes(key)) {
            filtered[key] = data[key];
        }
    });
    return filtered;
};

// create trip 
export const createTrip = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Only admin can create trips" });
        }

        const allowedData = filterFields(req.body, adminFields);

        // VALIDATION DATES
        if (!allowedData.startDate) {
            return res.status(400).json({ msg: "Start date is required" });
        }

        const start = new Date(allowedData.startDate);
        if (isNaN(start.getTime())) {
            return res.status(400).json({ msg: "Invalid start date" });
        }

        if (allowedData.endDate) {
            const end = new Date(allowedData.endDate);

            if (isNaN(end.getTime())) {
                return res.status(400).json({ msg: "Invalid end date" });
            }

            if (end <= start) {
                return res.status(400).json({ msg: "End date must be after start date" });
            }
        }

        const newTrip = new Trip(allowedData);

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
        let allowedData = {};

        if (req.user.role === "admin") {
            allowedData = filterFields(req.body, adminFields);
        } else if (req.user.role === "driver") {
            allowedData = filterFields(req.body, driverFields);
        } else {
            return res.status(403).json({ msg: "Unauthorized" });
        }

        // RÉCUPÉRER L'ANCIEN TRIP POUR COMPARER
        const existingTrip = await Trip.findById(id);
        if (!existingTrip) {
            return res.status(404).json({ msg: "Trip not found" });
        }

        // VALIDATION DATES
        const startDate = allowedData.startDate || existingTrip.startDate;
        const endDate = allowedData.endDate || existingTrip.endDate;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (allowedData.endDate) {  
            if (isNaN(end.getTime())) {
                return res.status(400).json({ msg: "Invalid end date" });
            }
            if (end <= start) {
                return res.status(400).json({ msg: "End date must be after start date" });
            }
        }

        const updatedTrip = await Trip.findByIdAndUpdate(id, allowedData, { new: true });

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

// update status
export const updateTripStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const updatedTrip = await Trip.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTrip) {
            const error = new Error("Trip not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ msg: "Trip status updated successfully", success: true, data: updatedTrip });
    } catch (error) {
        next(error);
    }       
};


