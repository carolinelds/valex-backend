import { stripHtml } from "string-strip-html";
import { Request, Response, NextFunction } from "express";
import errorResponse from "./../responses/errorResponses.js";

export default function validSchema(schema: any, entity: string) {    
    return async (req: Request, res: Response, next: NextFunction) => {       
        const body: object = req.body;
        const schemaBody: object = {};

        for (const key in body) {
            if (typeof schema[key] === "string") {
                schemaBody[key] = stripHtml(body[key]).result.trim();
            } else {
                schemaBody[key] = body[key];
            }
        }

        const validation = schema.validate(schemaBody, { abortEarly: false });

        if (validation.error) {
            return errorResponse.badRequest(entity);
        }
        
        res.locals.body = validation.value;

        next();
    }
}