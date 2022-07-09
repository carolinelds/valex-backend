import { Router } from "express";

import mainRouter from "./mainRouter.js";

const router = Router();

router.use(mainRouter);

export default router;
