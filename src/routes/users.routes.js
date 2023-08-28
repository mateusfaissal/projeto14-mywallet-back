import { Router } from "express";
import { signUp, signIn, } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema, signInSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
userRouter.post("/sign-in", validateSchema(signInSchema), signIn);
//userRouter.get("/logged-user", loggedUser);
//userRouter.get("/usuarios", getUsuarios);
//userRouter.get("/sessions", getSessions);

export default userRouter;