import mongoose from "mongoose";
import Address from "./address.js";
import Cart from "./cart.js";

const Order = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    products_info: Cart.schema,
    phone_number: Number,
    address: Address.schema,
    amount: Number,
    date: Date,
    status: Number, // pending=0, approved=1, on-the-way=2, delivered=3  
})

export default mongoose.model("Order", Order);