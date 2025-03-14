import express from "express"
import { UserController } from "../Controllers/user.js";

const RegisterRouter = express.Router();

RegisterRouter.route('/')
    .get(async (req, res) => {
        const user = await UserController.getUserByToken(req, res)
        if(!user)
            res.render('./Login-Register/register');
        else {
            res.render('Partials/No-Access/noAccess.ejs')
        }
    });

export default RegisterRouter;

