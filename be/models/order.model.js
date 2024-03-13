import mongoose, { SchemaType } from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers"},
        restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants"},
        items: [
            {
                item_id: { type: mongoose.Schema.Types.ObjectId, ref: "menus" },
                // quantity of how many items the customer ordered of that item
                quantity: { type: Number, required: true}
            }
        ],
        subtotal: { type: Number },
        pickup_time: { type: String },
        status: { type: String }
    },
    { timestamps: true, strictQuery: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;