import { CartService } from "../Services/cart";

const createCart = async (req, res) => {
    try {
        const new_cart = await CartService.createCart(req.body);
        await res.status(201).json(new_cart);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a cart", 
        message: error.message
        });
    }
}

const getCartById = async (req, res) => {
    try {
        const cart = await CartService.getCartById(req.body.id);
        res.status(201).json(cart);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a cart by id",
            message: error.message
        });
    }
}

const getAllCarts = async (req, res) => {
    try {
        const carts = await CartService.getAllCarts();
        res.status(201).json(carts);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all carts",
            message: error.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const updated_cart = await CartService.updateCart(req.body.id,req.body);
        res.status(201).json(updated_cart);
    } 
    catch(error) {
        res.status(500).json({
            error: "Error updating a cart",
            message: error.message
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        const deleted_cart = await CartService.deleteCart(req.body.id);
        res.status(201).json(deleted_cart);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting a cart",
            message: error.message
        })
    }
}

export const CartController = {createCart, getCartById, getAllCarts, updateCart, deleteCart};