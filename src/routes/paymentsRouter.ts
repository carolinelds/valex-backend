import { Router } from "express";
import { makePayment } from "../controllers/paymentController.js";
import validSchema from "../middlewares/validSchemasMiddleware.js";
import paymentSchema from "../schemas/paymentSchema.js";

const paymentsRouter = Router();

paymentsRouter.post("/payment",
    validSchema(paymentSchema, "The selected card and/or the password and/or the selected business and/or the amount to pay"),
    makePayment
);

export default paymentsRouter;