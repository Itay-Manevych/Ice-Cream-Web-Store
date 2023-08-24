import express from "express"

const RegisterRouter = express.Router();

RegisterRouter.route('/')
    .get((req, res) => {
        res.render('./Login-Register/Register');
    });

export default RegisterRouter;

