import mongoose from "mongoose";
import category from "./category.js";
import allergies from "./allergies.js";

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    image: Buffer,
    in_stock: Boolean,
    amount: Number,
    allergies: allergies.schema,
    category: category.schema,
})

export default mongoose.model("product", productSchema);