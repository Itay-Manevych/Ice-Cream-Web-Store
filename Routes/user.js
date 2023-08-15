import express from "express"
import { UserController }  from "../Controllers/user.js";

const UserRouter = express.Router();

UserRouter.route('/')
    .get(async (req, res) => {
        const users = await UserController.getAllUsers(req,res);
        res.json(users);
    })
    .post(UserController.createUser)

UserRouter.route('/:id')
    .get(UserController.getUserById)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser)

export default UserRouter;

