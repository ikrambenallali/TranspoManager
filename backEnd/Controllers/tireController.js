import Tire from '../Models/Tire.js';

// create tire 
export const createTire = async (req, res, next) => {
    try {
        const { truck, trailer, position, etat, dateInstallation } = req.body;

        const existPosition = await Tire.findOne({ position, truck, trailer });
        if (existPosition) {
            const error = new Error("This position already has a tire for the specified truck or trailer.");
            error.statusCode = 400;
            return next(error);
        }

        const newTire = new Tire({
            truck,
            trailer,
            position,
            etat,
            dateInstallation,
        });

        await newTire.save();

        res.status(201).json({
            msg: "Pneu créé avec succès",
            tire: newTire
        });

    } catch (error) {
        next(error);
    }
}

// get all tires
export const getAllTires = async (req, res, next) => {
    try {
        const tires = await Tire.find();
        res.status(200).json({ msg: "voici tout les pneus", sucess: true, data: tires });

    } catch (error) {
        next(error)
    }
}

// get tire by id 
export const getTireById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tire = await Tire.findById(id);
        if (!tire) {
            const error = new Error("not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ msg: "tire found", sucess: true, data: tire });

    } catch (error) {
        next(error);
    }
}

// update tire
export const updateTire = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateTire = await Tire.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateTire) {
            const error = new Error("not found");
            error.statusCode = 404;
            return next(error);
        }
        await updateTire.save();
        res.status(200).json({ msg: "tire updated", sucess: true, data: updateTire });

    } catch (error) {
        next(error);
    }
}

// delete tire 
export const deleteTire = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await Tire.findByIdAndDelete((id));
        if (!deleted) {
            const error = new Error("not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ msg: "tire deleted", sucess: true, data: deleted });
    } catch (error) {
        next(error);
    }
}
export default { createTire, getAllTires, getTireById, updateTire ,deleteTire};