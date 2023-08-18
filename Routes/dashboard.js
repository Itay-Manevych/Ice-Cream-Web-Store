import express from "express"
import { UserController } from "../Controllers/user.js";
const DashboardRouter = express.Router();

DashboardRouter.route('/')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        res.render('./Dashboard/dashboard',{user: user});
    })
    .post(async (req,res) => {
        const user = await UserController.destroyCookie(req, res);
        res.json(user);
    })

DashboardRouter.route('/user')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        res.json(user);
    })

DashboardRouter.route('/update-details')
    .post(async (req, res) => {
        const user = await UserController.updateUserByToken(req,res);
        res.json(user);
    })

export default DashboardRouter;

