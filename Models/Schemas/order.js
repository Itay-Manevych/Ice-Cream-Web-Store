import mongoose from "mongoose";
import Address from "./address.js";

const ProductInfo = new mongoose.Schema({
    product_name: String,
    total_price: Number,
    additions: {
        sprinkles: Boolean,
        hot_chocolate: Boolean,
        gummy_bears: Boolean,
    },
    amount: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: "Amount must have a valid value",
        },
    },
}, {
    required: true,
});

const Order = new mongoose.Schema({
    // _id: Number,
    name: String,
    email: String,
    // cart: Cart.schema,
    products_info: [ProductInfo],
    phone_number: Number,
    address: Address.schema,
    amount: {
        type: Number,
        validate: {
            validator: (value) => {
                return value > 0;
            },
            message: "Amount must be a valid value",
        },
    },
    date: Date,
}, {
    required: true,
    unique: false,
});

export default mongoose.model("Order", Order);