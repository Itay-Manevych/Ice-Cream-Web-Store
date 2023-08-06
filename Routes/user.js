import express from "express"
import { UserController }  from "../Controllers/user.js";

const UserRouter = express.Router();

UserRouter.route('/')
    .get(UserController.getAllUsers)
    .post(UserController.createUser)

UserRouter.route('/:id')
    .get(UserController.getUserById)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser)

export default UserRouter;

