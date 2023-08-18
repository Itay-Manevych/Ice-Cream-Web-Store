import express from "express"
import { UserController }  from "../Controllers/user.js";

const UserRouter = express.Router();

UserRouter.route('/')
    .get(async (req, res) => {
        const users = await UserController.getAllUsers(req,res);
        res.json(users);
    })
    .post(UserController.createUser)

UserRouter.route('/:email')
    .get(UserController.getUserByEmail)
    .put(UserController.updateUserByEmail)
    .delete(UserController.deleteUserByEmail)


export default UserRouter;

