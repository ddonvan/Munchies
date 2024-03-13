import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema(
    {
        firstName: { type: String, requiried: true },
        lastName: { type: String, requiried: true },
        restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants"},
        position: { type: String }
        },
    { timestamps: true, strictQuery: true }
);

const Manager = mongoose.model("Manager", ManagerSchema);

export default Manager;