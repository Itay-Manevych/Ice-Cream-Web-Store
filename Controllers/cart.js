import { CartService } from "../Services/cart.js";

const createCart = async (req, res) => {
    try {
        const new_cart = await CartService.createCart(req.body);
        res.status(201).json(new_cart);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating a cart model", 
        message: error.message,
        });
    }
}

const getCartById = async (req, res) => {
    try {
        const cart = await CartService.getCartById(req.params.id);
        if(!cart) {
            throw new Error("There is not an existing cart with that id");
        }
        res.status(201).json(cart);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding a cart by id",
            message: error.message,
        });
    }
}

const getAllCarts = async (req, res) => {
    try {
        const carts = await CartService.getAllCarts();
        if(!carts) {
            throw new Error("There are no existing cart models");
        }
        res.status(201).json(carts);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all cart models",
            message: error.message,
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const updated_cart = await CartService.updateCart(req.body.id, req.body);
        res.status(201).json(updated_cart);
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating a cart model",
            message: error.message,
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        const deleted_cart = await CartService.deleteCart(req.body.id);
        if(!deleted_cart) {
            throw new Error("The cart model you are trying to delete does not exist");
        }
        res.status(201).json(deleted_cart);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting a cart model",
            message: error.message,
        })
    }
}

export const CartController = {createCart, getCartById, getAllCarts, updateCart, deleteCart};