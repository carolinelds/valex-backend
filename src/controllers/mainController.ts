import { Request, Response } from "express";

export async function getId(req: Request, res: Response) {
    const { id } = req.params;
    res.send( { id } ); 
}