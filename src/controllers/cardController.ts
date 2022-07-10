import { Request, Response } from "express";
import errorResponses from "../responses/errorResponses.js";
import { createCardService } from "./../services/createCardService.js";
import * as companyRepository from "./../repositories/companyRepository.js";

export async function createCard(req: Request, res: Response){
    
    const apiKey = req.headers['x-api-key'];
    const company = await companyRepository.findByApiKey(apiKey.toString());

    const { employeeId, type } : { employeeId: number, type: string } = req.body;
        
    const result = await createCardService(company.id, employeeId, type);

    res.sendStatus(200);
}