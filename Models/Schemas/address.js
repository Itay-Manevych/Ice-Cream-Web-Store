import mongoose from "mongoose";

const Address = new mongoose.Schema({
    city: String,
    street: String,
    apartment: Number,
    floor: Number
}, {
    required: true,
});

export default mongoose.model("Address", Address);