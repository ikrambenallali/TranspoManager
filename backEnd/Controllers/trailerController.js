import Trailer from '../Models/Trailer.js';

// create Trailer
export const createTrailer = async (req, res, next) => {
    try {
        const { matricule, type, capacity, status } = req.body;
        if (!matricule || !type || !capacity || !status) {
            return res.status(400).json({
                msg: "Tous les champs sont obligatoires"
            });
        }

        const existMatricule = await Trailer.findOne({ matricule });
        if (existMatricule) {
            const error = new Error("This matricule already exists.");
            error.statusCode = 400;
            return next(error);
        }

        const newTrailer = new Trailer({
            matricule,
            type,
            capacity,
            status,
        });

        await newTrailer.save();

        res.status(201).json({
            msg: "Remorque créée avec succès",
            trailer: newTrailer
        });

    } catch (error) {
        next(error);
    }
};


// fetch all Trailers
export const getAllTrailers = async (req, res, next) => {
    try {
        const trailers = await Trailer.find();
        res.status(200).json({
            success: true,
            msg: "Voici toutes les remorques",
            data: trailers
        });
    } catch (error) {
        next(error);
    }
};


// fetch Trailer by id 
export const getTrailerById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const trailer = await Trailer.findById(id);
        if (!trailer) {
            const error = new Error("Trailer not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            msg: "Voici la remorque",
            data: trailer
        });

    } catch (error) {
        next(error);
    }
};


// delete Trailer 
export const deleteTrailer = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleted = await Trailer.findByIdAndDelete(id);
        if (!deleted) {
            const error = new Error("Trailer not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            msg: "Remorque supprimée avec succès",
            data: deleted
        });

    } catch (error) {
        next(error);
    }
};


// update Trailer
export const updateTrailer = async (req, res, next) => {
    try {
        const id = req.params.id;

        const updated = await Trailer.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            const error = new Error("Trailer not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            msg: "Remorque mise à jour avec succès",
            data: updated
        });

    } catch (error) {
        next(error);
    }
};

export default { createTrailer, getAllTrailers, getTrailerById, deleteTrailer, updateTrailer };
