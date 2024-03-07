import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        address: { type: String },
        imageURL: { type: String }
        
    },
    { timestamps: true, strictQuery: true}
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;