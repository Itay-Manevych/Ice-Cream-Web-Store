import mongoose from "mongoose";
import Allergies from "./allergies.js";
import Category from "./category.js";

const Product = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    image: Buffer,
    in_stock: Boolean,
    amount: Number,
    allergies: Allergies.schema,
    category: Category.schema,
})

export default mongoose.model("Product", Product);