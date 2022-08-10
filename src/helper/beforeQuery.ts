import MESSAGE_RESPONSE from "../constraints";
import { ResponseError } from "./error";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loggerQuery = (isShow: boolean): { [key: string]: any } => {
    if (isShow) {
        return {};
    }
    return { logging: console.log };
};

export class BaseValidate {}

export class BaseValidateType extends BaseValidate {
    static async checkTypesDeletedAt(
        services: any,
        idType: number,
        message: string
    ) {
        if (idType) {
            const deletedAt = await services.findIdDeletedAt(idType);
            if (deletedAt) {
                throw new ResponseError(
                    400,
                    message + " " + MESSAGE_RESPONSE.deleted
                ).toJSON();
            }
        }
    }
}
