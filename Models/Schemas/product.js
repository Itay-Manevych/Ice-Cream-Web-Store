import mongoose from "mongoose";
import Category from "./category.js";
import makeAllRequired from "./makeAllRequired.js";

const Allergies = new mongoose.Schema({
    lactose: Boolean,
    nuts: Boolean,
    soy: Boolean,
    gluten: Boolean,
    eggs: Boolean,
});

const Product = new mongoose.Schema({
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
    allergies: Allergies,
    categories: [Category.schema],
});


makeAllRequired(Product)
makeAllRequired(Allergies);

export default mongoose.model("Product", Product);