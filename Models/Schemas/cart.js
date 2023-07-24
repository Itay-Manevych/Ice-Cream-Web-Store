import mongoose from "mongoose";

const additions_schema = new mongoose.Schema({
    sprinkles: Boolean,
    hot_chocolate: Boolean,
    gummy_bears: Boolean
})

const product_info = new mongoose.Schema({
    product_id: Number,
    additions: additions_schema,
    amount: Number,
})

const cart_schema = new mongoose.Schema({
    id: Number,
    products_info: [product_info]
})

export default mongoose.model("cart", cart_schema);