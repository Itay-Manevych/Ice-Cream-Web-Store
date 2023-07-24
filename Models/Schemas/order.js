import mongoose from "mongoose";
import address from "./address.js";
import cart from "./cart.js";

const order_schema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    products_info: cart.schema,
    phone_number: Number,
    address: address.schema,
    amount: Number,
    date: Date,
    status: Number, // pending=0, approved=1, on-the-way=2, delivered=3  
})

export default mongoose.model("order", order_schema);