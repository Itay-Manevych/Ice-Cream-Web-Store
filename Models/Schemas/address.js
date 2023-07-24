import mongoose from "mongoose";

const address_schema = new mongoose.Schema({
    city: String,
    street: String,
    apartment: Number,
    floor: Number
})

export default mongoose.model("address", address_schema);