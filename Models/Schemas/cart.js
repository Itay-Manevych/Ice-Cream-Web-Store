import mongoose from "mongoose";

const Additions = new mongoose.Schema({
    sprinkles: Boolean,
    hot_chocolate: Boolean,
    gummy_bears: Boolean
})

const ProductInfo = new mongoose.Schema({
    product_id: Number,
    additions: Additions,
    amount: Number,
})

const Cart = new mongoose.Schema({
    id: Number,
    products_info: [ProductInfo]
})

export default mongoose.model("Cart", Cart);