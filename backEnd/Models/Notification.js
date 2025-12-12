import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["truck", "trailer", "tire", "maintenance", "fuel", "other"],
        required: true
    },

    message: { type: String, required: true },

    truck: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Truck",
        default: null 
    },

    trailer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Trailer",
        default: null 
    },

    tire: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Tire",
        default: null 
    },

    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", notificationSchema);
