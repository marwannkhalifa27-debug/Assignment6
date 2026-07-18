import { Router } from "express";
import { sequelize } from "../../DB/db.js";
import { signup , putUser , getByEmail, getByID } from "./user.controller.js";

const userRoutes = Router()

userRoutes.post("/signup", signup)

userRoutes.put("/:id", putUser)

userRoutes.get("/by-email", getByEmail)

userRoutes.get("/:id", getByID)

export default userRoutes