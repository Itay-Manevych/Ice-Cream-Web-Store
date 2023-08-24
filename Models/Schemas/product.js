import mongoose from "mongoose";
import Allergies from "./allergies.js";
import Category from "./category.js";

const Product = new mongoose.Schema({
    // _id: Number,
    name: {
        type: String,
        unique: true,
    },
    description: String,
    image: String,
    price: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: "Price must have a valid value",
        },
    },
    amount_purchased: Number,
    allergies: Allergies.schema,
    categories: [Category.schema],
}, {
    required: true,
});

export default mongoose.model("Product", Product);