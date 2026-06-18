import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";

const routes = Router();

routes.post("/users", createUser);
routes.get("/users", getUsers);
routes.put("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

export default routes;