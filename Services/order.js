import Order from "../Models/Schemas/order"

const createOrder = async (data) => {
    const new_order = new Order(data);
    return await new_order.save();
}

const getOrderById = async (id) => {
    return await Order.findById(id);
}

const getAllOrders = async () => {
    return await Order.find({});    
}

const updateOrder = async (id, updated_data) => {
    return await Order.findByIdAndUpdate(id, updated_data, {new: true});
}

const deleteOrder = async (id) => {
    return await Order.findByIdAndDelete(id);
}

export const OrderService = {createOrder, getOrderById, getAllOrders, updateOrder, deleteOrder};