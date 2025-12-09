import Truck from '../Models/Truck.js';


// create truck
export const createTruck = async (req, res) => {
    try {
        const { matricule, marque, kilometrage, carburantCapacity, status } = req.body;

        const existMatricule = await Truck.findOne({ matricule });
        if (existMatricule) {
            return res.status(400).json({ msg: "This matricule already exists." });
        }
        const newTruck = new Truck({
            matricule,
            marque,
            kilometrage,
            carburantCapacity,
            status,
        })
        await newTruck.save();
        res.status(201).json({ msg: "Camion creer avec succees", truck: { matricule: newTruck.matricule, marque: newTruck.marque, kilometrage: newTruck.kilometrage, carburantCapacity: newTruck.carburantCapacity, status: newTruck.status }, });

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.log(error);
    }
}
// fetch all trucks
export const getAllTrucks = async (req, res) => {
    try {
        const trucks = await Truck.find();
        res.status(200).json({ success: true, msg: "voici touts les camions", data: trucks });

    } catch (error) {
        console.log(error);
    }
}
// fetch truck by id 
export const getTruckById = async (req, res) => {
    try {
        const id = req.params.id;
        const truck = await Truck.findById(id);
        res.status(200).json({ success: true, msg: "voici le camion", data: truck });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
}
// delete truck 
export const deleteTruck = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTruck = await Truck.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "Camion supprimé avec succès", data: deleteTruck });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
}
// update truck
export const updateTruck =async (req,res)=>{
    try{
        const id=req.params.id;
        const updatetruck=await Truck.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({success:true,msg:"Camion mis à jour avec succès",data:updatetruck});
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Server error"});
    }
}

export default { createTruck, getAllTrucks, getTruckById, deleteTruck, updateTruck };