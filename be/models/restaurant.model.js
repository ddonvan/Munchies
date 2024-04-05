import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true}, // Restaurant name
        address: { type: String }, // Address of restaurant
        imageURL: { type: String } // Image URL for restaurant
        
    },
    { timestamps: true, strictQuery: true}
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;