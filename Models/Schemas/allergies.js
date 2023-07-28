import mongoose from "mongoose";

const Allergies = new mongoose.Schema({
    id: Number,
    lactose: Boolean,
    nuts: Boolean,
    soy: Boolean,
    gluten: Boolean,
    eggs: Boolean,
}, {
    required: true,
    _id: false,
});

export default mongoose.model("Allergies", Allergies);