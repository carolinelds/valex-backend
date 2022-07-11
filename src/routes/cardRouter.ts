import { Router } from "express";
import { createCard, activateCard, getCardTransactions } from "../controllers/cardController.js";
import { checkApiKey, checkCardType } from "../middlewares/cardMiddlewares.js";
import validSchema from "./../middlewares/validSchemasMiddleware.js";
import createCardSchema from "./../schemas/createCardSchema.js";
import activateCardSchema from "./../schemas/activateCardSchema.js";
import getCardTransactionsSchema from "./../schemas/getCardTransactionsSchema.js";

const cardRouter = Router();

cardRouter.post("/card",
    validSchema(createCardSchema, "Employee and/or card type"),
    checkApiKey,
    checkCardType,
    createCard
);

cardRouter.post("/card/activate", 
    validSchema(activateCardSchema, "The selected card and/or security code and/or password"),
    activateCard
);

cardRouter.get("/card",
    validSchema(getCardTransactionsSchema, "The selected card"), 
    getCardTransactions
);

export default cardRouter;