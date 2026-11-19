import express, { type Request, type Response } from "express";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "ok",
    });
});

//routes auth


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});