import { Router } from "express";
import { signUp, signIn } from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);

export default userRouter;