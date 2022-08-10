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
import { AddScheduleDto, RecordOther } from "../dto/scheduleDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { EventService, ScheduleService } from "../services";
import { checkValidDeleteEventService } from "./general";
import { UpdateScheduleDto } from "../dto/scheduleDto";
const DEFAULT_PREFIX = PrefixRoute.SCHEDULE;
const NAME_MODEL = "lịch trình ";
const NAME_PREFIX = "tiêu đề " + NAME_MODEL;
// const PROPERTIES_FOREIGN = "thuoc_tinh_id";

@Controller(DEFAULT_PREFIX)
@Service()
export class ScheduleController {
    constructor(
        private readonly eventService: EventService,
        private readonly scheduleService: ScheduleService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(
        @Body() dto: AddScheduleDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            const schedule = await this.scheduleService.findByName(dto.tieu_de);
            console.log(
                "%cscheduleController.ts line:42 object",
                "color: #007acc;",
                schedule
            );
            if (schedule) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            const saved = await this.scheduleService.create(dto);
            if (!saved) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.addFailed
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
        @Body() dto: UpdateScheduleDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            if (dto?.tieu_de && dto?.tieu_de?.trim()?.length > 0) {
                const scheduleDeletedAt =
                    await this.scheduleService.findIdDeletedAt(id);
                if (scheduleDeletedAt) {
                    throw new ResponseError(
                        400,
                        "ID " + MESSAGE_RESPONSE.deleted
                    ).toJSON();
                }

                const scheduleHasTieuDeExist =
                    await this.scheduleService.findAllNameNotId(
                        dto.tieu_de,
                        id
                    );
                console.log(
                    "%cscheduleController.ts line:86 object",
                    "color: #007acc;",
                    scheduleHasTieuDeExist
                );
                if (scheduleHasTieuDeExist?.length > 0) {
                    throw new ResponseError(
                        400,
                        NAME_PREFIX + MESSAGE_RESPONSE.exists
                    ).toJSON();
                }
            }

            const isUpdate = await this.scheduleService.updateById(id, dto);

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
            const deleted = await this.scheduleService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.scheduleService.deleteById(id);

            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.deleteFailed
                ).toJSON();
            }

            // await checkValidDeleteEventService(
            //     id,
            //     this.eventService,
            //     PROPERTIES_FOREIGN
            // );

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
            const eventType = await this.scheduleService.findById(id);

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
            const user = await this.scheduleService.findAll();

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
