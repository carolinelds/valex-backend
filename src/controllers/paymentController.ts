import { Request, Response } from "express";
import { makePaymentService } from "../services/makePaymentService.js";

export async function makePayment(req: Request, res: Response){
    const { cardId, password, businessId, amount } : { cardId: number, password: string, businessId: number, amount: number } = res.locals.body;

    await makePaymentService(cardId, password, businessId, amount);

    res.status(200).send("Payment completed.");
}