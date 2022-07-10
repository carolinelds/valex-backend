import { Request, Response, NextFunction } from "express";
import { findByApiKey } from "./../repositories/companyRepository.js";
import errorResponses from "./../responses/errorResponses.js";

export async function checkApiKey(req: Request, res: Response, next: NextFunction){
    const apiKey = req.headers['x-api-key'];
    
    const result = await findByApiKey(apiKey.toString());
    if (!result){
        return errorResponses.notFound("Your company was");
    }

    next();
}   

