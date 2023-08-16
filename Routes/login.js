import express from "express"
import { LoginController } from "../Controllers/login.js";

const LoginRouter = express.Router();

LoginRouter.route('/')
    .get((req, res) => {
        res.render('./Login-Register/login');
    })
    .post(LoginController.loginUser);

export default LoginRouter;

