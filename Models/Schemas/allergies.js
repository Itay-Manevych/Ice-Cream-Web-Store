import mongoose from "mongoose";

const allergies_schema = new mongoose.Schema({
    lactose: Boolean,
    nuts: Boolean,
    soy: Boolean,
    gluten: Boolean,
    eggs: Boolean,
})

export default mongoose.model("allergies", allergies_schema);