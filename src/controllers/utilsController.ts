/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Controller,
    Post,
    HttpCode,
    Authorized,
    UploadedFiles,
} from "routing-controllers";
import { Service } from "typedi";
import { onSuccess } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathUtils } from "../helper/role";
import { fileUploadOptions } from "../helper/upload";
import { IResponseImage } from "../interfaces/utils";
import { ResponseError } from "../helper/error";

const DEFAULT_PREFIX = PrefixRoute.UTILS;
const KEY_UPLOAD = "files";
const FOLDER_ASSET_UPLOAD = "/assets/uploads";

@Controller(DEFAULT_PREFIX)
@Service()
export class UtilsController {
    @Post(PathUtils.UPLOAD_IMAGE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathUtils.UPLOAD_IMAGE)
    async uploadImage(
        @UploadedFiles(KEY_UPLOAD, { options: fileUploadOptions })
        files: any
    ): Promise<{ [key: string]: unknown }> {
        try {
            if (files?.length === 0) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.isRequire
                ).toJSON();
            }
            const payload: IResponseImage[] = files.map(
                (file: IResponseImage) => {
                    return {
                        filename: file.filename,
                        mimetype: file.mimetype,
                        size: file.size,
                        uri: FOLDER_ASSET_UPLOAD + "/" + file.filename,
                    };
                }
            );

            return onSuccess(payload, MESSAGE_RESPONSE.addSuccess, 200);
        } catch (error) {
            return error;
        }
    }
}
