import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        firstName: { type: String, requiried: true }, //First name of Customer
        lastName: { type: String, requiried: true }, //Last name of Customer
        email: { type: String , required: true}, //Email of customer
        phone: { type: String }, //Phone number of customer
    },
    { timestamps: true, strictQuery: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;