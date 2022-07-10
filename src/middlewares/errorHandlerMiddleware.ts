import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    if (error.type === "error_not_found") return res.status(404).send(error.message);

    return res.sendStatus(500);
}