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
import { AddMeetingDto, UpdateMeetingDto } from "../dto/meetingDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { UserService, MeetingService } from "../services";
import { checkValidDeleteUserService } from "./general";
const DEFAULT_PREFIX = PrefixRoute.MEETING;
const NAME_MODEL = "phân ban ";
const NAME_PREFIX = "Tên " + NAME_MODEL;
const PROPERTIES_FOREIGN = "phan_ban_id";
@Controller(DEFAULT_PREFIX)
@Service()
export class MeetingController {
    constructor(
        private readonly meetingService: MeetingService // private readonly userServices: UserService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: AddMeetingDto): Promise<{ [key: string]: unknown }> {
        try {
            // const disision = await this.meetingService.findByName(
            //     dto.ten
            // );

            // if (disision) {
            //     throw new ResponseError(
            //         400,
            //         NAME_PREFIX + MESSAGE_RESPONSE.exists
            //     ).toJSON();
            // }

            const saved = await this.meetingService.create(dto);
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
        @Body() dto: UpdateMeetingDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            // if (dto?.ten && dto?.ten?.trim()?.length > 0) {
            //     const deletedAt =
            //         await this.meetingService.findIdDeletedAt(id);
            //     if (deletedAt) {
            //         throw new ResponseError(
            //             400,
            //             "ID " + MESSAGE_RESPONSE.deleted
            //         ).toJSON();
            //     }

            //     const hasTenExist =
            //         await this.meetingService.findAllNameNotId(
            //             dto.ten,
            //             id
            //         );
            //     if (hasTenExist?.length > 0) {
            //         throw new ResponseError(
            //             400,
            //             NAME_PREFIX + MESSAGE_RESPONSE.exists
            //         ).toJSON();
            //     }
            // }

            const isUpdate = await this.meetingService.updateById(id, dto);

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
            const deleted = await this.meetingService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.meetingService.deleteById(id);

            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.deleteFailed
                ).toJSON();
            }

            // await checkValidDeleteUserService(
            //     id,
            //     this.userServices,
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
            const user = await this.meetingService.findById(id);

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
            const user = await this.meetingService.findAll();

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
