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
import { RecordOther, UpdateTypeDto } from "../dto/generalDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { IGroup } from "../interfaces/group";
import { EventService, EventTypeService } from "../services";
import { checkValidDeleteEventService } from "./general";
const DEFAULT_PREFIX = PrefixRoute.EVENT_TYPE;
const NAME_MODEL = "loại sự kiện ";
const NAME_PREFIX = "Tên " + NAME_MODEL;
const PROPERTIES_FOREIGN = "loai_su_kien_id";
@Controller(DEFAULT_PREFIX)
@Service()
export class EventTypeController {
    constructor(
        private readonly eventTypeService: EventTypeService,
        private readonly eventService: EventService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: RecordOther): Promise<{ [key: string]: unknown }> {
        try {
            const eventTypeFound =
                await this.eventTypeService.findEventTypeByName(dto.ten);

            if (eventTypeFound) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            const payload: IGroup = {
                ten: dto.ten,
            };

            const save = await this.eventTypeService.createEventType(payload);
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
            const eventTypeDeletedAt =
                await this.eventTypeService.findIdDeletedAt(id);
            if (eventTypeDeletedAt) {
                throw new ResponseError(
                    400,
                    "ID " + MESSAGE_RESPONSE.deleted
                ).toJSON();
            }

            if (dto?.ten && dto?.ten?.trim()?.length > 0) {
                const groupHasTenExist =
                    await this.eventTypeService.findAllNameNotId(dto.ten, id);
                if (groupHasTenExist?.length > 0) {
                    throw new ResponseError(
                        400,
                        NAME_PREFIX + MESSAGE_RESPONSE.exists
                    ).toJSON();
                }
            }

            const isUpdate = await this.eventTypeService.updateEventTypeById(
                id,
                dto
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
            const deleted = await this.eventTypeService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.eventTypeService.deleteById(id);

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
            const eventType = await this.eventTypeService.findEventTypeById(id);

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
            const user = await this.eventTypeService.findEventTypeAll();

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
