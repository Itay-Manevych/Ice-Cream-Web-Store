import mongoose from "mongoose";
import Address from "./address.js";
import Cart from "./cart.js";

const Order = new mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    products_info: Cart.schema,
    phone_number: Number,
    address: Address.schema,
    amount: {
        type: Number,
        validate: {
            validator: (value) => {
                return value > 0;
            },
            message: `${value} is not a valid value`,
        },
    },
    date: Date,
    status: { type: Number, enum: [0,1,2,3] } // pending = 0, approved = 1, on-the-way = 2, delivered = 3  
}, {
    required: true,
});

export default mongoose.model("Order", Order);