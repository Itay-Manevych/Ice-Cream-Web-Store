import mongoose from "mongoose";

const Allergies = new mongoose.Schema({
    lactose: Boolean,
    nuts: Boolean,
    soy: Boolean,
    gluten: Boolean,
    eggs: Boolean,
})

export default mongoose.model("Allergies", Allergies);