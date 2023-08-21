import mongoose from "mongoose";

const Allergies = new mongoose.Schema({
    // _id: Number,
    lactose: Boolean,
    nuts: Boolean,
    soy: Boolean,
    gluten: Boolean,
    eggs: Boolean,
}, {
    required: true,
});

export default mongoose.model("Allergies", Allergies);