import mongoose from "mongoose";

const productInfo = new mongoose.Schema({
    productId: Number,
    changes: String,
    amount: Number,
})

const cartSchema = new mongoose.Schema({
    id: Number,
    productsInfo: [productInfo]
})

export default mongoose.model("cart", cartSchema);