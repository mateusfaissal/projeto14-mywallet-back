import { Router } from "express";
import { getTransactions, postTransactions } from "../controllers/transactions.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { transactionsSchema } from "../schemas/transactions.schemas.js";

const transactionsRouter = Router();

transactionsRouter.use(validateAuth);
transactionsRouter.post("/transaction/:type", validateSchema(transactionsSchema), postTransactions);
transactionsRouter.get("/transactions", getTransactions);

export default transactionsRouter;