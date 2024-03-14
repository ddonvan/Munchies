
import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {
        rest_id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants"},
        item_id: { type: Number, required: true },
        item_name: { type: String, required: true },
        category: { type: String},
        imageURL: { type: String },
        price: { type: Number, required: true },
        frequency: { type: Number, required: true},
        status: {type: String, required: true}
        
    },
    { timestamps: true, strictQuery: true}
);

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
