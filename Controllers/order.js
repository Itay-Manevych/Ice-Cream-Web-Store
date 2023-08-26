import { OrderService } from "../Services/order.js";
import { ProductService } from "../Services/product.js";

const createOrder = async (req, res) => {
    try {
        const new_order = await OrderService.createOrder(req.body);
        for (const product_info of req.body.products_info) {
            const product = await ProductService.getProductByName(product_info.product_name);
            if (product) {
                product.amount_purchased += product_info.amount;
                await product.save();
            }
        }
        res.status(201).json(new_order);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating an order model", 
        message: error.message,
        });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await OrderService.getOrderById(req.params.id);
        if(!order) {
            throw new Error("There is not an existing order model with that id");
        }
        res.status(201).json(order);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding an order model by id",
            message: error.message,
        });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        if(!orders) {
            throw new Error("There are no existing order models");
        }
        res.status(201)
        return orders;
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all order models",
            message: error.message,
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const updated_order = await OrderService.updateOrder(req.params.id, req.body);
        res.status(201).json(updated_order);
    }
    catch(error) {
        res.status(500).json({
            error: "Error updating an order model",
            message: error.message,
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deleted_order = await OrderService.deleteOrder(req.params.id);
        if(!deleted_order) {
            throw new Error("The order model you are trying to delete does not exist");
        }
        res.status(201).json(deleted_order);
    }
    catch(error) {
        res.status(500).json({
            error: "Error deleting an order model",
            message: error.message,
        })
    }
}

export const OrderController = {createOrder, getOrderById, getAllOrders, updateOrder, deleteOrder};