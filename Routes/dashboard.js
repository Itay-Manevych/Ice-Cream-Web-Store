import express from "express"
import { UserController } from "../Controllers/user.js";
const DashboardRouter = express.Router();

DashboardRouter.route('/')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res);
        console.log(user);
        res.render('./Dashboard/dashboard',{user: user});
    })

export default DashboardRouter;

