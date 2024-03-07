import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer"},
        restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
        items: [
            {
                item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
                // quantity of how many items the customer ordered of that item
                quantity: { type: Number, required: true}
            }
        ],
        subtotal: { type: Float},
        pickup_time: { type: String },
        status: { type: String }
    },
    { timestamps: true, strictQuery: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;