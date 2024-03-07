
import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {
        item_id: { type: Number, required: true },
        item_name: { type: String, required: true },
        price: { type: Float, required: true },
        frequency: { type: Number, required: true},
        status: {type: String, required: true}
        
    },
    { timestamps: true, strictQuery: true}
);

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
