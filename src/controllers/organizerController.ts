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
import { EventService, OrganizerService } from "../services";
import { checkValidDeleteEventService } from "./general";
import { IOrganizer } from "../interfaces/organizer";
const DEFAULT_PREFIX = PrefixRoute.ORGANIZER;
const NAME_MODEL = "nhà tổ chức ";
const NAME_PREFIX = "Tên " + NAME_MODEL;
const PROPERTIES_FOREIGN = "nha_to_chuc_id";

@Controller(DEFAULT_PREFIX)
@Service()
export class OrganizerController {
    constructor(
        private readonly eventService: EventService,
        private readonly organizerService: OrganizerService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: AddTypeDto): Promise<{ [key: string]: unknown }> {
        try {
            const organizer = await this.organizerService.findByName(dto.ten);

            if (organizer) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            const payload: IOrganizer = {
                ten: dto.ten,
            };

            const savedGroup = await this.organizerService.create(payload);
            if (!savedGroup) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.addFailed
                ).toJSON();
            }
            return onSuccess(savedGroup, MESSAGE_RESPONSE.addSuccess, 200);
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
                const organizerDeletedAt =
                    await this.organizerService.findIdDeletedAt(id);
                if (organizerDeletedAt) {
                    throw new ResponseError(
                        400,
                        "ID " + MESSAGE_RESPONSE.deleted
                    ).toJSON();
                }

                const organizerHasTenExist =
                    await this.organizerService.findAllNameNotId(dto.ten, id);
                if (organizerHasTenExist?.length > 0) {
                    throw new ResponseError(
                        400,
                        NAME_PREFIX + MESSAGE_RESPONSE.exists
                    ).toJSON();
                }
            }

            const isUpdate = await this.organizerService.updateById(id, dto);

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
            const deleted = await this.organizerService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.organizerService.deleteById(id);

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
            const eventType = await this.organizerService.findById(id);

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
            const user = await this.organizerService.findAll();

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
