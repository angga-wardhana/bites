import type { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate = <T>(schema: ZodType<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            res.status(400).json({ error: "Invalid request data", details: err });
        }
    };
}