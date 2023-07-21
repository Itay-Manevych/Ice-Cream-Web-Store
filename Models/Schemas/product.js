import mongoose from "mongoose";
import category from "./category";
import allergies from "./allergies";

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    image: Buffer,
    in_stock: Boolean,
    allergies: allergies.schema,
    category: category.schema,
})

export default mongoose.model("product", productSchema);