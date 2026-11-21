import "dotenv/config"
import type { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const COOKIE_NAME = "session";
const JWT_SECRET = process.env.JWT_SECRET!

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "lax",
    path: "/"
}

export const createSession = (res: Response, userId?: string) => {
    const token = jwt.sign({ sub: userId }, JWT_SECRET, {expiresIn: "1d"});

    //TODO: create accessToken, refreshToken.

    res.cookie(COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
    });
}

export const clearCookie = (res: Response) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);
    return;
}