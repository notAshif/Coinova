import express, { type Request, type Response } from "express";
import authRouter from "./src/routes/authRoutes";
import cookie from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookie());

app.get("/api/v1/health", (req: Request, res: Response) => {
    return res.status(200).json({
        ok: true
    });
});

//routes auth
app.use("/api/v1/auth", authRouter)

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});