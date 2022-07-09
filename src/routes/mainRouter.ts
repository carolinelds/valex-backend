import { Router } from "express";

import { getId } from "./../controllers/mainController.js";

const mainRouter = Router();

mainRouter.get("/check/:id", getId);

export default mainRouter;