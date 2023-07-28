import { OrderService } from "../Services/order.js";

const createOrder = async (req, res) => {
    try {
        const new_order = await OrderService.createOrder(req.body);
        res.status(201).json(new_order);
    }
    catch(error) {
        res.status(500).json({
        error: "Error creating an order", 
        message: error.message
        });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await OrderService.getOrderById(req.body.id);
        res.status(201).json(order);
    }
    catch(error) {
        res.status(500).json({
            error: "Error finding an order by id",
            message: error.message
        });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(201).json(orders);
    }
    catch(error) {
        res.status(500).json({
            error: "Error getting all orders",
            message: error.message
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const updated_order = await OrderService.updateOrder(req.body.id, req.body);
        res.status(201).json(updated_order);
    }

    catch(error) {
        res.status(500).json({
            error: "Error updating an order",
            message: error.message
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deleted_order = await OrderService.deleteOrder(req.body.id);
        res.status(201).json(deleted_order);
    }

    catch(error) {
        res.status(500).json({
            error: "Error deleting an order",
            message: error.message
        })
    }
}

export const OrderController = {createOrder, getOrderById, getAllOrders, updateOrder, deleteOrder};