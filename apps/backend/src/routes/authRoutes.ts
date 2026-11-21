import express, { Router } from "express";
import { authController } from "../controller/authController";
import { middleware } from "../middleware/auth";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.get("/me", middleware, authController.getMe);
authRouter.post("/logout", authController.logout);


export default authRouter;