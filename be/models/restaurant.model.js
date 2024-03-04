import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        address: { type: String },
        menu: [
            {
                item_id: { type: Number, required: true },
                item_name: { type: String, required: true },
                price: { type: String, required: true },
                quantity: { type: Number, required: true}
            }
        ]
    },
    { timestamps: true, strictQuery: true}
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;