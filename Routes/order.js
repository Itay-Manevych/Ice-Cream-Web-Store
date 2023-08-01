import express from "express"
import { OrderController }  from "../Controllers/order.js";

const OrderRouter = express.Router();

OrderRouter.route('/')
    .get(OrderController.getAllOrders)
    .post(OrderController.createOrder);

OrderRouter.route('/:id')
    .get(OrderController.getOrderById)
    .put(OrderController.updateOrder)
    .delete(OrderController.deleteOrder);

export default OrderRouter;