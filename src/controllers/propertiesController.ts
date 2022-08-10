import {
    Controller,
    Body,
    Post,
    HttpCode,
    Authorized,
    Param,
    Get,
    Put,
    Delete,
} from "routing-controllers";
import { Service } from "typedi";
import { AddTypeDto, UpdateTypeDto } from "../dto/generalDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { IProperties } from "../interfaces";
import { EventService, PropertiesService } from "../services";
import { checkValidDeleteEventService } from "./general";
const DEFAULT_PREFIX = PrefixRoute.PROPERTIES;
const NAME_MODEL = "thuộc tính ";
const NAME_PREFIX = "Tên " + NAME_MODEL;
const PROPERTIES_FOREIGN = "thuoc_tinh_id";

@Controller(DEFAULT_PREFIX)
@Service()
export class PropertiesController {
    constructor(
        private readonly eventService: EventService,
        private readonly propertiesService: PropertiesService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: AddTypeDto): Promise<{ [key: string]: unknown }> {
        try {
            const properties = await this.propertiesService.findByName(dto.ten);

            if (properties) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            const payload: IProperties = {
                ten: dto.ten,
            };

            const save = await this.propertiesService.create(payload);
            if (!save) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.addFailed
                ).toJSON();
            }
            return onSuccess(save, MESSAGE_RESPONSE.addSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Put(PathRole.UPDATE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.UPDATE)
    async update(
        @Param("id") id: number,
        @Body() dto: UpdateTypeDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            if (dto?.ten && dto?.ten?.trim()?.length > 0) {
                const propertiesDeletedAt =
                    await this.propertiesService.findIdDeletedAt(id);
                if (propertiesDeletedAt) {
                    throw new ResponseError(
                        400,
                        "ID " + MESSAGE_RESPONSE.deleted
                    ).toJSON();
                }

                const propertiesHasTenExist =
                    await this.propertiesService.findAllNameNotId(dto.ten, id);
                if (propertiesHasTenExist?.length > 0) {
                    throw new ResponseError(
                        400,
                        NAME_PREFIX + MESSAGE_RESPONSE.exists
                    ).toJSON();
                }
            }

            const isUpdate = await this.propertiesService.updateById(id, dto);

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
            const deleted = await this.propertiesService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.propertiesService.deleteById(id);

            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.deleteFailed
                ).toJSON();
            }

            await checkValidDeleteEventService(
                id,
                this.eventService,
                PROPERTIES_FOREIGN
            );

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
            const eventType = await this.propertiesService.findById(id);

            if (!eventType) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idNotFound
                ).toJSON();
            }
            return onSuccess(eventType, MESSAGE_RESPONSE.getInfoSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Get(PathRole.ALL)
    @HttpCode(200)
    @Authorized(DEFAULT_PREFIX + PathRole.ALL)
    async getAll(): Promise<{ [key: string]: unknown }> {
        try {
            const user = await this.propertiesService.findAll();

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
