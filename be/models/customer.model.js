import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        firstName: { type: String, requried: true },
        lastName: { type: String, requried: true },
        email: { type: String , required: true},
        phone: { type: String },
    },
    { timestamps: true, strictQuery: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;