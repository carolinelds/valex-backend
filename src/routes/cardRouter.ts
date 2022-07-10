import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { checkApiKey } from "../middlewares/cardMiddlewares.js";

const cardRouter = Router();

cardRouter.post("/card/create", checkApiKey, createCard);

export default cardRouter;