import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema(
    {
        firstName: { type: String, requiried: true }, //First name of manager
        lastName: { type: String, requiried: true }, //Last name of manager
        restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants"}, //Object Id of Restaurant
        position: { type: String } //Mangers position
        },
    { timestamps: true, strictQuery: true }
);

const Manager = mongoose.model("Manager", ManagerSchema);

export default Manager;