import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { checkApiKey, checkCardType } from "../middlewares/cardMiddlewares.js";
import validSchema from "./../middlewares/validSchemasMiddleware.js";
import createCardSchema from "./../schemas/createCardSchema.js";

const cardRouter = Router();

cardRouter.post("/card/create",
    validSchema(createCardSchema, "Employee and/or card type"),
    checkApiKey,
    checkCardType,
    createCard
);

export default cardRouter;