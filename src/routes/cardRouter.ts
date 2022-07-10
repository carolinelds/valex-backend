import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { checkApiKey, checkCardType } from "../middlewares/cardMiddlewares.js";

const cardRouter = Router();

// FIXME: create and add validSchema middleware
cardRouter.post("/card/create", checkApiKey, checkCardType, createCard);

export default cardRouter;