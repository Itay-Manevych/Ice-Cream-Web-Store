import mongoose from "mongoose";

const Additions = new mongoose.Schema({
    sprinkles: Boolean,
    hot_chocolate: Boolean,
    gummy_bears: Boolean,
}, {
    required: true,
});

const ProductInfo = new mongoose.Schema({
    _id: Number,
    additions: Additions,
    amount: {
        type: Number,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: `${value} is not a valid value`,
        },
    },
}, {
    required: true,
});

const Cart = new mongoose.Schema({
    _id: Number,
    products_info: [ProductInfo],
}, {
    required: true,
});

export default mongoose.model("Cart", Cart);