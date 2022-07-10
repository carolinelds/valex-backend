import { Request, Response, NextFunction } from "express";
import * as companyRepository from "./../repositories/companyRepository.js";
import * as cardRepository from "./../repositories/cardRepository.js";
import errorResponses from "./../responses/errorResponses.js";

export async function checkApiKey(req: Request, res: Response, next: NextFunction){
    const apiKey = req.headers['x-api-key'];
    
    const result = await companyRepository.findByApiKey(apiKey.toString());
    if (!result){
        return errorResponses.notFound("Your company was");
    }

    next();
}

export async function checkCardType(req: Request, res: Response, next: NextFunction){
    const { type } : { type: string } = req.body;

    if (!cardRepository.isTransactionType(type)) {
        return errorResponses.notFound("Card type");
    }

    next();
}
