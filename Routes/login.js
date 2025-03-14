import express from "express"
import { LoginController } from "../Controllers/login.js";
import { UserController } from "../Controllers/user.js";

const LoginRouter = express.Router();

LoginRouter.route('/')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res)
        if(!user)
            res.render('./Login-Register/login');
        else {
            res.render('Partials/No-Access/noAccess.ejs')
        }
    })
    .post(LoginController.loginUser);

export default LoginRouter;

