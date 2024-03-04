import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer"},
        restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
        items: [
            {
                item_id: { type: Number, required: true }
            }
        ],
        pickup_time: { type: String }
    },
    { timestamps: true, strictQuery: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;