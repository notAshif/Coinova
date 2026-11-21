import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../lib/session";

const JWT_SECRET = process.env.JWT_SECRET!

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
        return res.status(404).json({ message: "unauthorized" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

        req.userId = payload.userId;


        next();
    } catch (error: unknown) {
        return res.status(500).json({
            message: "Internal server error."
        });
    }
}