import Trailer from '../Models/Trailer.js';


// create Trailer
export const createTrailer = async (req, res) => {
    try {
        const { matricule, type, capacity, status } = req.body;

        const existMatricule = await Trailer.findOne({ matricule });
        if (existMatricule) {
            return res.status(400).json({ msg: "This matricule already exists." });
        }
        const newTrailer = new Trailer({
            matricule,
            type,
            capacity,
            status,
        })
        await newTrailer.save();
        res.status(201).json({ msg: "remorque creer avec succees", Trailer: { matricule: newTrailer.matricule, type: newTrailer.type, capacity: newTrailer.capacity, status: newTrailer.status }, });

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.log(error);
    }
}
// fetch all Trailers
export const getAllTrailers = async (req, res) => {
    try {
        const Trailers = await Trailer.find();
        res.status(200).json({ success: true, msg: "voici touts les remorqurs", data: Trailers });

    } catch (error) {
        console.log(error);
    }
}
// fetch Trailer by id 
export const getTrailerById = async (req, res) => {
    try {
        const id = req.params.id;
        const trailer = await Trailer.findById(id);
        res.status(200).json({ success: true, msg: "voici le remorque", data: trailer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
}
// delete Trailer 
export const deleteTrailer = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTrailer = await Trailer.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "remorque supprimé avec succès", data: deleteTrailer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
}
// update Trailer
export const updateTrailer =async (req,res)=>{
    try{
        const id=req.params.id;
        const updateTrailer=await Trailer.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({success:true,msg:"remorque mis à jour avec succès",data:updateTrailer});
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Server error"});
    }
}

export default { createTrailer, getAllTrailers, getTrailerById, deleteTrailer, updateTrailer };