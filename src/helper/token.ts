/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { IUser, IDecodeToken } from "../interfaces/user";
import { Action } from "routing-controllers";
import { Request } from "express";
import Settings from "../config";

function isEmptyAuth(authHeader: string): boolean {
    return authHeader?.toString()?.trim()?.length === 0;
}

const isCheckStartBearer = (authHeader: string): boolean => {
    return authHeader?.toString()?.startsWith("Bearer ");
};

export const getToken = (authHeader: string): string | null => {
    if (!authHeader) {
        return null;
    }
    if (!isCheckStartBearer(authHeader)) {
        return null;
    }
    if (isEmptyAuth(authHeader)) {
        return null;
    }
    return authHeader.replace("Bearer ", "");
};

export function createAccessToken(payload: IUser): string {
    return jwt.sign(payload, process.env.SECRET_JWT_TOKEN, {
        expiresIn: +process.env.TOKEN_LIFE || 86400, //14đ
    });
}

export function createRefreshToken(payload: IUser): string {
    return jwt.sign(payload, process.env.SECRET_JWT_REFRESH_TOKEN, {
        // expiresIn: process.env.REFRESH_TOKEN_LIFE as string,
        expiresIn: +process.env.REFRESH_TOKEN_LIFE || 1209600, // 1đ
    });
}

export function getExpiresInToken(): string {
    return process.env.TOKEN_LIFE;
}

export function createTokenByUser(user: IUser): { [key: string]: string } {
    const payload: IUser = {
        id: user.id,
        phan_quyen: user.phan_quyen,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    const expiresIn = getExpiresInToken();

    return { accessToken, refreshToken, expiresIn };
}

export function getDecodeToken(token: string, secretKey: string): IDecodeToken {
    try {
        const decoded: any = jwt.verify(token, secretKey);
        return {
            success: true,
            decoded: decoded as IUser,
        };
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
}

export function checkIsAuthorizeAndGetToken(
    authorization: string
): string | null {
    // Remove when upload server.
    authorization = authorization || Settings.authorization_default;
    if (!authorization) {
        return null;
    }

    return getToken(authorization);
}

export const getTokenFromHeader = (action: Action): string | null => {
    const { authorization } = action.request.headers;
    return checkIsAuthorizeAndGetToken(authorization);
};

export const getTokenFromRequestHeader = (req: Request): string | null => {
    const { authorization } = req.headers;
    return checkIsAuthorizeAndGetToken(authorization);
};
