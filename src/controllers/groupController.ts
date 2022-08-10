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
import { Service, Container } from "typedi";
import { AddTypeDto, UpdateTypeDto } from "../dto/generalDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponseList } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import { PrefixRoute, PathRole } from "../helper/role";
import { IGroup } from "../interfaces/group";
import { ITokenDecode } from "../interfaces/general";
import { UserService, GroupService } from "../services";
import { checkValidDeleteUserService } from "./general";
const DEFAULT_PREFIX = PrefixRoute.GROUP;
const NAME_MODEL = "nhóm ";
const NAME_PREFIX = "Tên " + NAME_MODEL;
const PROPERTIES_FOREIGN = "nhom_id";
@Controller(DEFAULT_PREFIX)
@Service()
export class GroupController {
    constructor(
        private readonly groupService: GroupService,
        private readonly userServices: UserService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: AddTypeDto): Promise<{ [key: string]: unknown }> {
        try {
            const groupFound = await this.groupService.findByName(dto.ten);

            if (groupFound) {
                throw new ResponseError(
                    400,
                    NAME_PREFIX + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            const user: ITokenDecode = Container.get("user_request");

            const groupPayload: IGroup = {
                ten: dto.ten,
                nguoi_tao_id: user.id,
            };

            const savedGroup = await this.groupService.create(groupPayload);
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
                const deleteAt = await this.groupService.findIdDeletedAt(id);
                if (deleteAt) {
                    throw new ResponseError(
                        400,
                        "ID " + MESSAGE_RESPONSE.deleted
                    ).toJSON();
                }

                const hasTenExist = await this.groupService.findAllNameNotId(
                    dto.ten,
                    id
                );
                if (hasTenExist?.length > 0) {
                    throw new ResponseError(
                        400,
                        NAME_PREFIX + MESSAGE_RESPONSE.exists
                    ).toJSON();
                }
            }

            const isUpdate = await this.groupService.updateById(id, dto);

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
            const deleted = await this.groupService.findIdDeletedAt(id);

            if (deleted) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idDeleted
                ).toJSON();
            }

            const isUpdate = await this.groupService.deleteById(id);

            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.deleteFailed
                ).toJSON();
            }

            await checkValidDeleteUserService(
                id,
                this.userServices,
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
            const user = await this.groupService.findById(id);

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
            const user = await this.groupService.findAll();

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
