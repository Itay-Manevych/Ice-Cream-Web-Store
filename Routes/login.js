import express from "express"

const LoginRouter = express.Router();

LoginRouter.route('/')
    .get((req, res) => {
        res.render('./Login-Register/login');
    });

export default LoginRouter;

