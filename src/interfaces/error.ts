export interface IBaseResponse {
    status?: number;
    message?: string;
    path?: string;
}

export type IPayloadError = IBaseResponse;
