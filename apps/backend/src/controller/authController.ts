import type { Request, Response } from "express";
import { signUpSchema, loginSchema } from "@repo/common";
import { db } from "@repo/database";
import { WelcomeSendEmail } from "../lib/email";
import { clearCookie, createSession } from "../lib/session";

export const authController = {
    async signup(req: Request, res: Response) {
        try {

            const { data, success } = signUpSchema.safeParse(req.body);

            if (!success) {
                return res.status(401).json({ message: "Invalid email or password." });
            }

            const { username, email, password } = data;

            const existingUser = await db.orm.users.where({ email }).first();

            if (existingUser) {
                return res.status(409).json({
                    message: "user already exist. Try to login"
                });
            }

            const hashPass = await Bun.password.hash(password);

            const user = await db.orm.users.create({
                username,
                email,
                password: hashPass
            });

            const send  = await WelcomeSendEmail(email, username);

            createSession(res, user.id);

            return res.status(200).json({
                id: user.id,
                email: user.email,
                username: user.username,
                send
            });

        } catch (error: unknown) {
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    async login(req: Request, res: Response) {
        try {
            
            const { data, success } = loginSchema.safeParse(req.body);
            
            if (!success) {
                return res.status(401).json({ message: "Invalid email or password." });
            }

            const { email, password } = data;

            const user = await db.orm.users.where({ email }).first();

            if (!user) {
                return res.status(404).json({
                    message: "user not found."
                });
            }

            const validPass = await Bun.password.verify(password, user.password);

            if (!validPass) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            createSession(res, user.id);

            return res.status(200).json({
                id: user.id,
                email: user.email,
                username: user.username,
            });

        } catch (error: unknown) {
            return res.status(500).json({
                message: "Internal server error."
            });
        }
    },

    async getMe(req: Request, res: Response) {
        try {
            
            const user = await db.orm.users.where({ id: req.userId }).first();

            if (!user) {
                clearCookie(res);
                return res.status(404).json({
                    message: "user not found."
                });
            }

            createSession(res, user.id)

            return res.status(200).json({
                id: user.id,
                email: user.email,
                username: user.username,
            });

        } catch (error: unknown) {
            return res.status(500).json({
                message: "Internal server error."
            });
        }
    },

    async logout(req: Request, res: Response) {
        try {

            clearCookie(res);
            return res.status(200).json({
                message: "Logout successfully."
            });

        } catch (error: unknown) {
            return res.status(500).json({
                message: "Internal server error."
            });
        }
    }
}