import mongoose from "mongoose";
import Allergies from "./allergies.js";
import Category from "./category.js";

const Product = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        unique: true,
    },
    description: String,
    image: Buffer,
    price: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: "Price must have a valid value",
        },
    },
    quantity: {
        type: Number,
        validate: {
          validator: (value) => {
            return Number.isInteger(value) && value >= 0;
          },
          message: "Quantity must have a valid value",
        },
    },
    allergies: Allergies.schema,
    category: Category.schema,
}, {
    required: true,
});

export default mongoose.model("Product", Product);