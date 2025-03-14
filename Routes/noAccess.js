import express from "express";

const NoAccessRouter = express.Router();

NoAccessRouter.route('/')
    .get(async (req, res) => {
        return res.render('Partials/No-Access/noAccess.ejs');
})

export default NoAccessRouter;