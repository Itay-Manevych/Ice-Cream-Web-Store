import express from "express";
import { UserController } from "../Controllers/user.js";

const CheckoutRouter = express.Router();

CheckoutRouter.route('/')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res)
        if(!user)
            res.render('Partials/No-Access/noAccess.ejs');
        res.render('Partials/Checkout/checkout.ejs');
})

export default CheckoutRouter;