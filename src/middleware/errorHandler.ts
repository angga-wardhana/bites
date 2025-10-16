import type { Response } from "express";
import { sendError } from "../util/responses";

export function errorHandler(err: any, res: Response) {
    console.error(err);
    sendError(res, err, 500);
}