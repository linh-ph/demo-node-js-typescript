/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Controller,
    Body,
    Post,
    HttpCode,
    Authorized,
    Param,
    Get,
    UploadedFiles,
    Put,
    UploadedFile,
    Delete,
} from "routing-controllers";
import { Service } from "typedi";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { IBannerEvent } from "../interfaces";
import { BannerEventService, EventService } from "../services";
import { AddBannerEventDto, UpdateBannerEventDto } from "../dto/bannerEventDto";
import { fileUploadOptions } from "../helper/upload";
import { IResponseImage } from "../interfaces/utils";

const DEFAULT_PREFIX = PrefixRoute.BANNER_EVENT;
const NAME_PREFIX = "Tên ảnh bìa ";
const KEY_UPLOAD = "duong_dan";
const FOLDER_ASSET_UPLOAD = "/assets/uploads";

@Controller(DEFAULT_PREFIX)
@Service()
export class BannerEventController {
    constructor(
        private readonly bannerEventService: BannerEventService,
        private readonly eventService: EventService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(
        // @UploadedFiles(KEY_UPLOAD, { options: fileUploadOptions })
        // files: any,
        @Body() dto: AddBannerEventDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            // if (files?.length === 0) {
            //     throw new ResponseError(
            //         400,
            //         MESSAGE_RESPONSE.isRequire
            //     ).toJSON();
            // }

            // const eventBannerPayload: Array<IBannerEvent> = files.map(
            //     (file: IResponseImage) => {
            //         return {
            //             su_kien_id: dto.su_kien_id,
            //             ten: file.filename,
            //             duong_dan: FOLDER_ASSET_UPLOAD + "/" + file.filename,
            //         };
            //     }
            // );

            // const saved = await this.bannerEventService.create(
            //     eventBannerPayload
            // );
            // if (!saved) {
            //     throw new ResponseError(
            //         400,
            //         NAME_PREFIX + MESSAGE_RESPONSE.addFailed
            //     ).toJSON();
            // }

            return onSuccess({}, MESSAGE_RESPONSE.addSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Put(PathRole.UPDATE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.UPDATE)
    async update(
        @Param("id") id: number,
        @Body() dto: UpdateBannerEventDto,
        @UploadedFile(KEY_UPLOAD, { options: fileUploadOptions })
        file: any
    ): Promise<{ [key: string]: unknown }> {
        try {
            const deletedAt = await this.bannerEventService.findIdDeletedAt(id);
            if (deletedAt) {
                throw new ResponseError(
                    400,
                    "ID " + MESSAGE_RESPONSE.deleted
                ).toJSON();
            }

            const exists = await this.bannerEventService.findIdExist(id);

            if (!exists) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idNotFound
                ).toJSON();
            }

            const hasDeleted = await this.eventService.findIdDeletedAt(
                dto.su_kien_id
            );

            if (hasDeleted) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.deleted
                ).toJSON();
            }

            let payload: IBannerEvent = {
                su_kien_id: dto.su_kien_id,
            };

            if (file && "filename" in file) {
                payload = {
                    ...payload,
                    ten: file.filename,
                    duong_dan: FOLDER_ASSET_UPLOAD + "/" + file.filename,
                };
            }

            const isUpdate = await this.bannerEventService.updateById(
                id,
                payload
            );
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
            const deleted = await this.bannerEventService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.bannerEventService.deleteById(id);

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
            const user = await this.bannerEventService.findById(id);

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
            const user = await this.bannerEventService.findAll();

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
