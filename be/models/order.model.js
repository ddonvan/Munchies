import mongoose, { SchemaType } from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers"}, // ID for customer
        restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants"}, // ID for restaurant ordered from
        items: [ // list of items in the order
            {
                item_id: { type: mongoose.Schema.Types.ObjectId, ref: "menus" }, // ID of each item in order
                // quantity of how many the customer ordered of that item
                quantity: { type: Number, required: true}
            }
        ],
        subtotal: { type: Number }, // Subtotal of all items in order
        pickup_time: { type: String }, // Selected pickup time for customer
        status: { type: String } // status of order (Ordered, In Progress, Awaiting Pickup, Completed)
    },
    { timestamps: true, strictQuery: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;