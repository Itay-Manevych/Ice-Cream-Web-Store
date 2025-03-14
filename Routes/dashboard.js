import express from "express"
import { UserController } from "../Controllers/user.js";
import { ProductController } from "../Controllers/product.js";
import { CategoryController } from "../Controllers/category.js";
import { OrderController } from "../Controllers/order.js";
const DashboardRouter = express.Router();

DashboardRouter.route('/')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        if(user === undefined) {
            return res.render('./Login-Register/login');
        }
        const products = await ProductController.getAllProducts(req, res);
        const categories = await CategoryController.getAllCategories(req, res);
        const orders = await OrderController.getAllOrders(req, res);
        const orders_of_user = [];
        for(let i = 0; i < orders.length; i++) {
            if(orders[i].email === user.email) {
                orders_of_user.push(orders[i]);
            }
        }
        res.render('./Dashboard/dashboard',{user: user, products: products, categories: categories, orders_of_user: orders_of_user, all_orders: orders});
    })
    .post(async (req,res) => {
        const user = await UserController.destroyCookie(req, res);
        res.json(user);
    });

DashboardRouter.route('/user')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        res.json(user);
    });

DashboardRouter.route('/update-details')
    .post(async (req, res) => {
        const user = await UserController.updateUserByToken(req,res);
        res.json(user);
    });

DashboardRouter.route('/products')
    .get(async (req, res) => {
        const products = await ProductController.getAllProducts(req, res);
        res.json(products);
    });

DashboardRouter.route('/orders')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        if(user === undefined || user.is_admin === false) {
            return res.render('./Partials/No-Access/noAccess');
        }
        const orders = await OrderController.getAllOrders(req, res);
        res.json(orders);
    });

DashboardRouter.route('/admin-product')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        if(user === undefined || user.is_admin === false) {
            return res.render('./Partials/No-Access/noAccess');
        }
        const products = await ProductController.getAllProducts(req, res);
        const categories = await CategoryController.getAllCategories(req, res);
        res.render("./Dashboard/Admin/Admin-Product-Display/adminProduct",{ user: user, products: products, categories: categories });
    });


DashboardRouter.route('/admin-category')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        if(user === undefined || user.is_admin === false) {
            return res.render('./Partials/No-Access/noAccess');
        }
        const products = await ProductController.getAllProducts(req, res);
        const categories = await CategoryController.getAllCategories(req, res);
        res.render("./Dashboard/Admin/Admin-Category-Display/adminCategory",{ user: user, products: products, categories: categories });
    });

DashboardRouter.route('/admin-order')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        if(user === undefined || user.is_admin === false) {
            return res.render('./Partials/No-Access/noAccess');
        }
        const products = await ProductController.getAllProducts(req, res);
        const categories = await CategoryController.getAllCategories(req, res);
        const orders = await OrderController.getAllOrders(req, res);
        res.render("./Dashboard/Admin/Admin-Order-Display/adminOrder",{ user: user, products: products, categories: categories, all_orders: orders });
    });

DashboardRouter.route('/statistics')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        if(user === undefined || user.is_admin === false) {
            return res.render('./Partials/No-Access/noAccess');
        }
        res.render("./Dashboard/Admin/Admin-Statistics-Display/adminStatistics.ejs");
    });
export default DashboardRouter;

