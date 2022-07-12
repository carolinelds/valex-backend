import { Request, Response } from "express";
import { rechargeCardService } from "../services/rechargeCardService.js";

export async function rechargeCard(req: Request, res: Response){
    const apiKey = req.headers['x-api-key'];

    const { cardId, amount } : { cardId: number, amount: number } = res.locals.body;

    await rechargeCardService(apiKey, cardId, amount);

    res.status(200).send("Card recharged.");
}