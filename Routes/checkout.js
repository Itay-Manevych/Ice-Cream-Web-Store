import express from "express";

const checkoutRouter = express.Router();

checkoutRouter.route('/')
    .get(async (req, res) => {
        res.render('Partials/Checkout/checkout.ejs');
})

export default checkoutRouter;