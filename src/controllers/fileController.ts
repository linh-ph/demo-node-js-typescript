/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Controller,
    Post,
    HttpCode,
    Authorized,
    Param,
    Get,
    Put,
    UploadedFile,
    Delete,
} from "routing-controllers";
import { Service } from "typedi";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { IFile } from "../interfaces";
import { FileService } from "../services";
import { fileUploadOfficeOptions } from "../helper/upload";

const DEFAULT_PREFIX = PrefixRoute.FILE;
const NAME_PREFIX = "Tên file ";
const KEY_UPLOAD = "duong_dan";
const FOLDER_ASSET_UPLOAD = "/assets/file";

@Controller(DEFAULT_PREFIX)
@Service()
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(
        @UploadedFile(KEY_UPLOAD, { options: fileUploadOfficeOptions })
        file: any
    ): Promise<{ [key: string]: unknown }> {
        try {
            let payload: IFile = {};

            if (!file) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.isRequire
                ).toJSON();
            }

            if (file && "filename" in file) {
                payload = {
                    ten: file.filename,
                    duong_dan: FOLDER_ASSET_UPLOAD + "/" + file.filename,
                    loai: file.mimetype,
                    dung_luong: file.size.toString(),
                };
            }

            const saved = await this.fileService.create(payload);
            if (!saved) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.addFailed
                ).toJSON();
            }

            return onSuccess(saved, MESSAGE_RESPONSE.addSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Put(PathRole.UPDATE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.UPDATE)
    async update(
        @Param("id") id: number,
        @UploadedFile(KEY_UPLOAD, { options: fileUploadOfficeOptions })
        file: any
    ): Promise<{ [key: string]: unknown }> {
        try {
            if (!file) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.isRequire
                ).toJSON();
            }

            const deletedAt = await this.fileService.findIdDeletedAt(id);
            if (deletedAt) {
                throw new ResponseError(
                    400,
                    "ID " + MESSAGE_RESPONSE.deleted
                ).toJSON();
            }

            let payload: IFile = {};

            if (file && "filename" in file) {
                payload = {
                    ...payload,
                    ten: file.filename,
                    duong_dan: FOLDER_ASSET_UPLOAD + "/" + file.filename,
                    loai: file.mimetype,
                    dung_luong: file.size.toString(),
                };
            }

            const isUpdate = await this.fileService.updateById(id, payload);

            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.updateFailed
                ).toJSON();
            }

            return onSuccess(null, MESSAGE_RESPONSE.updateSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Delete(PathRole.DELETE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.DELETE)
    async delete(@Param("id") id: number): Promise<{ [key: string]: unknown }> {
        try {
            const deleted = await this.fileService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.fileService.deleteById(id);

            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.deleteFailed
                ).toJSON();
            }

            return onSuccess(null, MESSAGE_RESPONSE.deleteSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Get(PathRole.ID)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ID)
    async getId(@Param("id") id: number): Promise<{ [key: string]: unknown }> {
        try {
            const user = await this.fileService.findById(id);

            if (!user) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idNotFound
                ).toJSON();
            }
            return onSuccess(user, MESSAGE_RESPONSE.getInfoSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Get(PathRole.ALL)
    @HttpCode(200)
    @Authorized(DEFAULT_PREFIX + PathRole.ALL)
    async getAll(): Promise<{ [key: string]: unknown }> {
        try {
            const user = await this.fileService.findAll();

            if (!user) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.dataNotFound
                ).toJSON();
            }
            return onSuccess(
                createResponseList(user.rows),
                MESSAGE_RESPONSE.getInfoSuccess,
                200
            );
        } catch (error) {
            return error;
        }
    }
}
