import type { Request, Response, NextFunction } from "express";
import { sendError } from "../util/responses";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    sendError(res, err, 500);
}