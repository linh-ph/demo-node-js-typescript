/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Middleware,
    ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { Service, Container } from "typedi";
import { Response, Request, NextFunction } from "express";
import multer from "multer";
import { MESSAGE_MULTER } from "../constraints";
import { IPayloadError } from "../interfaces/error";
import Logger from "../helper/logger";
import { IUser } from "../interfaces/user";
import { getIdAndRoleUser } from "../helper";

const INDEX_ERRORS = 0;
type IConstraints = {
    error_message?: unknown;
};

const editKeyConstraintToErrorMessage = (constraints: {
    [key: string]: unknown;
}): { [key: string]: unknown } => {
    const obj: IConstraints = {};
    Object.keys(constraints).map((item) => {
        return (obj["error_message"] = constraints[item]);
    });
    return obj;
};

export const getErrorMessage = (
    errors: { [key: string]: any }[]
): { [key: string]: any } => {
    const error =
        typeof errors[INDEX_ERRORS] !== "undefined" ? errors[INDEX_ERRORS] : [];

    if (error?.length === 0) {
        return {};
    }
    const { constraints } = error;
    return editKeyConstraintToErrorMessage(
        constraints as { [key: string]: unknown }
    );
};

@Service()
@Middleware({ type: "after" })
export default class ErrorCatcherMiddleware
    implements ExpressErrorMiddlewareInterface
{
    error(
        error: { [key: string]: any },
        _req: Request,
        _res: Response,
        _next: NextFunction
    ): unknown {
        if (error) {
            if (_res.headersSent) {
                return _res.end();
            }

            return this.responseErrorToJson(error, _req, _res, _next);
        }

        return _next();
    }

    responseErrorToJson = (
        error: { [key: string]: any },
        _req: Request,
        _res: Response,
        _next: NextFunction
    ) => {
        const createRes: IPayloadError = {
            status: 400,
            message: "Có lỗi xảy ra",
        };

        let user: IUser = {};
        if (error instanceof multer.MulterError) {
            const multerError = {
                ...createRes,
                message: MESSAGE_MULTER[error.code],
            };
            user = Container.get("user_request");
            Logger.onLoggerError({
                ...multerError,
                ...getIdAndRoleUser(user),
                path: _req?.route?.path ?? "",
            });
            return _res.json(multerError);
        }

        if (error?.errors) {
            const errorsValidate = {
                ...createRes,
                status: error.httpCode,
                message:
                    getErrorMessage(error.errors)["error_message"] ??
                    createRes.message,
            };
            user = Container.get("user_request");
            Logger.onLoggerError({
                ...errorsValidate,
                ...getIdAndRoleUser(user),
                path: _req?.route?.path ?? "",
            });
            return _res.json(errorsValidate);
        }
        const errorOther = {
            ...createRes,
            status: error.httpCode,
            message: error.message,
        };
        Logger.onLoggerError({
            ...errorOther,
            ...getIdAndRoleUser(user),
            path: _req?.route?.path ?? "",
        });
        return _res.json(errorOther);
    };
}
