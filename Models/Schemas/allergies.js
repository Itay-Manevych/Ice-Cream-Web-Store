import mongoose from "mongoose";

const allergiesSchema = new mongoose.Schema({
    lactose: Boolean,
    nuts: Boolean,
    soy: Boolean,
    gluten: Boolean,
    eggs: Boolean,
})

export default mongoose.model("allergies", allergiesSchema);