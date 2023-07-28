import mongoose from "mongoose";

const Additions = new mongoose.Schema({
    sprinkles: Boolean,
    hot_chocolate: Boolean,
    gummy_bears: Boolean,
}, {
    required: true,
});

const ProductInfo = new mongoose.Schema({
    id: Number,
    additions: Additions,
    amount: Number,
}, {
    required: true,
    _id: false,
});

const Cart = new mongoose.Schema({
    id: Number,
    products_info: [ProductInfo],
}, {
    required: true,
    _id: false,
});

export default mongoose.model("Cart", Cart);