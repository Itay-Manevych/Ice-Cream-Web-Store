import mongoose from "mongoose";
import Product from "./product";

const ProductInfo = new mongoose.Schema({
    product: Product.schema,
    amount: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: `${value} is not a valid value`,
        },
    },
}, {
    required: true,
});

const Cart = new mongoose.Schema({
    _id: Number,
    products_info: [ProductInfo],
}, {
    required: true,
});

export default mongoose.model("Cart", Cart);