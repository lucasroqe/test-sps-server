import { Router } from "express";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/authController.js"
import { authMiddleware } from "../middlewares/auth.js"

const routes = Router();

routes.post("/login", loginUser)

//rotas só passam se estiver autenticado
routes.post("/users", authMiddleware , createUser);
routes.get("/users", authMiddleware, getUsers);
routes.put("/users/:id", authMiddleware, updateUser);
routes.delete("/users/:id", authMiddleware, deleteUser);

export default routes;