import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController.js";
import { checkApiKey } from "../middlewares/cardMiddlewares.js";
import validSchema from "../middlewares/validSchemasMiddleware.js";
import rechargeSchema from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge",
    validSchema(rechargeSchema, "The selected card and/or the amount to recharge"),
    checkApiKey,
    rechargeCard
);

export default rechargeRouter;