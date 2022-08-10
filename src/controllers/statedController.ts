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
import { RecordOther, UpdateStatedDto } from "../dto/statedDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { INature, IStated } from "../interfaces";
import { EventService, StatedService } from "../services";
import { checkValidDeleteEventService } from "./general";
const DEFAULT_PREFIX = PrefixRoute.STATED;
const NAME_PREFIX = "Tên nhà tổ chức ";
const PROPERTIES_FOREIGN = "nha_to_chuc";

@Controller(DEFAULT_PREFIX)
@Service()
export class StatedController {
    constructor(
        private readonly eventService: EventService,
        private readonly statedService: StatedService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: RecordOther): Promise<{ [key: string]: unknown }> {
        try {
            // const statedFound = await this.statedService.findByName(dto.ten);

            // if (statedFound) {
            //     throw new ResponseError(
            //         400,
            //         NAME_PREFIX + MESSAGE_RESPONSE.exists
            //     ).toJSON();
            // }

            const payload: IStated = {
                ...dto,
            };

            const savedGroup = await this.statedService.create(payload);
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
        @Body() dto: UpdateStatedDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            // if (dto?.ten && dto?.ten?.trim()?.length > 0) {
            //     const propertiesDeletedAt =
            //         await this.statedService.findIdDeletedAt(id);
            //     if (propertiesDeletedAt) {
            //         throw new ResponseError(
            //             400,
            //             "ID " + MESSAGE_RESPONSE.deleted
            //         ).toJSON();
            //     }

            //     const groupHasTenExist =
            //         await this.statedService.findAllNameNotId(dto.ten, id);
            //     if (groupHasTenExist?.length > 0) {
            //         throw new ResponseError(
            //             400,
            //             NAME_PREFIX + MESSAGE_RESPONSE.exists
            //         ).toJSON();
            //     }
            // }

            const isUpdate = await this.statedService.updateById(id, dto);

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
            const deleted = await this.statedService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.statedService.deleteById(id);

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
            const stated = await this.statedService.findById(id);

            if (!stated) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idNotFound
                ).toJSON();
            }
            return onSuccess(stated, MESSAGE_RESPONSE.getInfoSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Get(PathRole.ALL)
    @HttpCode(200)
    @Authorized(DEFAULT_PREFIX + PathRole.ALL)
    async getAll(): Promise<{ [key: string]: unknown }> {
        try {
            const user = await this.statedService.findAll();

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
