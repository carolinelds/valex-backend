import { Request, Response } from "express";
import { createCardService } from "./../services/createCardService.js";
import { activateCardService } from "./../services/activateCardService.js";
import * as companyRepository from "./../repositories/companyRepository.js";
import * as cardRepository from "./../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response){
    
    const apiKey = req.headers['x-api-key'];
    const company = await companyRepository.findByApiKey(apiKey.toString());

    const { employeeId, type } : { employeeId: number, type: cardRepository.TransactionTypes } = req.body;
    
    await createCardService(company.id, employeeId, type);

    res.status(200).send("Card created.");
}

export async function activateCard(req: Request, res: Response){
    const { id, securityCode, password } : 
    { id: number, securityCode: string, password: string } = req.body;

    await activateCardService(id, securityCode, password);

    res.sendStatus(200);
}