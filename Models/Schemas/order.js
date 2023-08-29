import mongoose from "mongoose";
import makeAllRequired from "./makeAllRequired.js";

const Address = new mongoose.Schema({
    city: String,
    street: String,
    apartment: Number,
    floor: Number
});


const ProductInfo = new mongoose.Schema({
    product_name: String,
    total_price: Number,
    image: String,
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
});

const Order = new mongoose.Schema({
    name: String,
    email: String,
    products_info: [ProductInfo],
    phone_number: Number,
    address: Address,
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
});
makeAllRequired(ProductInfo);
makeAllRequired(Order);
makeAllRequired(Address);

export default mongoose.model("Order", Order);