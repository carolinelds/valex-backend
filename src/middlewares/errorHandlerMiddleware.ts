import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    // MODEL:
    // if (error.type === "") return res.status().send(error.message);

    return res.sendStatus(500);
}