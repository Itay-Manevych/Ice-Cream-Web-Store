import mongoose from "mongoose";

const productInfo = new mongoose.Schema({
    product_id: Number,
    changes: String,
    amount: Number,
})

const cartSchema = new mongoose.Schema({
    id: Number,
    productsInfo: [productInfo]
})

export default mongoose.model("cart", cartSchema);