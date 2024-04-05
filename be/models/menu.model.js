
import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {
        rest_id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants"}, // Object Id of restaurant
        item_id: { type: Number, required: true }, // Id for item
        item_name: { type: String, required: true }, // Name of item
        category: { type: String}, // Category for item (ex. Burger, Chicken)
        imageURL: { type: String }, // Image URL for item
        price: { type: Number, required: true }, // Item's price
        frequency: { type: Number, required: true}, // Frequency for item ordered
        status: {type: String, required: true} // The inventory status of item
        
    },
    { timestamps: true, strictQuery: true}
);

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
