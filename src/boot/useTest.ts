import { Application, Request, Response } from "express";

export const useTest = (app: Application): void => {
    app.get("/", function (req: Request, res: Response) {
        res.send("hello world");
    });

    app.use("/test", (req: Request, res: Response) => {
        return res.send(`test`);
    });

    app.get("/v1", function (req: Request, res: Response) {
        res.send(
            "<a href='http://hkg-api.trieudo.link/v1/documentation'>API Documentation</a>"
        );
    });
};
