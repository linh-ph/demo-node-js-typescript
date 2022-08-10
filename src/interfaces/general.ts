import { IPayloadError } from "./error";

export interface IOnSuccess {
    data?: { [key: string]: unknown } | [] | null;
    message?: string;
    status?: number;
}

export interface IIdentification {
    id?: number;
}

export interface ITimeStamp extends IIdentification {
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface ICount {
    count: number;
}

export interface ISearch<T> extends ICount {
    rows: T[];
}

export type IPromiseGeneric<T> = Promise<T | null>;

export interface ITokenDecode {
    id?: number;
    phan_quyen?: string;
    iat?: number;
    exp?: number;
}

export interface ITimeLineLog {
    date?: Date | string;
    level?: string;
    message?: IPayloadError | string;
}

export interface IResTryCatch<T> {
    message: string;
    success: boolean;
    data?: T;
}
