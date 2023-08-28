import { Router } from "express";
import { signUp, signIn, signOut, } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema, signInSchema } from "../schemas/user.schemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
userRouter.post("/sign-in", validateSchema(signInSchema), signIn);
userRouter.use(validateAuth);
userRouter.post("/sign-out", signOut);


export default userRouter;