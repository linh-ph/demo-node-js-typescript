/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpError } from "routing-controllers";
import Logger from "./logger";
import { Service, Container } from "typedi";
import { IUser } from "../interfaces/user";
import { getIdAndRoleUser } from ".";
@Service()
export class ResponseError extends HttpError {
    public message: string;
    public code: number;
    public req: Request;

    constructor(code?: number, message?: string) {
        super(code || 400);
        Object.setPrototypeOf(this, ResponseError.prototype);
        this.code = code || 400;
        this.message = message || "";
    }

    //@typescript-eslint/explicit-module-boundary-types
    toJSON() {
        const createResError = {
            status: this.code || this.httpCode,
            message: this.message,
        };
        console.log(
            "%cerror.ts line:26 object",
            "color: #007acc;",
            createResError
        );
        const user: IUser = Container.get("user_request");
        const payloadLog = {
            ...createResError,
            ...getIdAndRoleUser(user),
        };
        Logger.onLoggerError(payloadLog);

        return createResError;
    }
}
