import express, { Application } from "express";
import path from "path";
export const useStatic = (app: Application): void => {
    app.use("/assets", express.static(path.join(__dirname, "../assets")));
};
