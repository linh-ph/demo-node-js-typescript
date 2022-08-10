/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Controller,
    Body,
    Post,
    HttpCode,
    Authorized,
    Param,
    Put,
    Get,
    Delete,
    QueryParams,
} from "routing-controllers";
import { Service } from "typedi";
import { UserService, GroupService } from "../services";
import { AddUserDto, UpdateUserDto } from "../dto/userDto";
import { SearchAttributeDto } from "../dto/generalDto";
import { ResponseError } from "../helper/error";
import { onSuccess, createResponsePaging } from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import {
    checkValidUser,
    getHashUserByPassword,
    checkValidUserUpdate,
    checkValidGroup,
    isDeletedUser,
} from "./general";
import { PrefixRoute, PathRole } from "../helper/role";
import Settings from "../config";
const DEFAULT_PASSWORD_USER = Settings.password_default;
const DEFAULT_PREFIX = PrefixRoute.USER;

@Controller(DEFAULT_PREFIX)
@Service()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly groupService: GroupService
    ) {}

    @Post(PathRole.ADD)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.ADD)
    async add(@Body() dto: AddUserDto): Promise<{ [key: string]: unknown }> {
        try {
            await checkValidUser(this.userService, dto);
            await checkValidGroup(this.groupService, dto);

            if (!dto.mat_khau) {
                dto.mat_khau = DEFAULT_PASSWORD_USER;
            }
            const user = await getHashUserByPassword(dto);

            const savedUser = await this.userService.createUser(user);

            if (!savedUser) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.registerFailed
                ).toJSON();
            }

            return onSuccess(savedUser, MESSAGE_RESPONSE.registerSuccess, 200);
        } catch (error) {
            return error;
        }
    }

    @Put(PathRole.UPDATE)
    @HttpCode(201)
    @Authorized(DEFAULT_PREFIX + PathRole.UPDATE)
    async update(
        @Param("id") id: number,
        @Body() dto: UpdateUserDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            const userFound = await this.userService.findByID(id);
            if (userFound === null) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.idNotFound
                ).toJSON();
            }

            if (userFound.email !== dto.email) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.emailChanged
                ).toJSON();
            }
            await checkValidUserUpdate(this.userService, dto, id);
            await checkValidGroup(this.groupService, dto);

            const user = await getHashUserByPassword(dto);
            const isUpdate = await this.userService.updateUserById(id, user);

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
            await isDeletedUser(this.userService, id);

            const isUpdate = await this.userService.deleteUserById(id);

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
    @HttpCode(200)
    @Authorized(DEFAULT_PREFIX + PathRole.ID)
    async getId(@Param("id") id: number): Promise<{ [key: string]: unknown }> {
        try {
            const user = await this.userService.findUserById(id);

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
    async getAll(
        @QueryParams() dto: SearchAttributeDto
    ): Promise<{ [key: string]: any }> {
        try {
            const user = await this.userService.findUserAll(dto);

            if (!user) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.dataNotFound
                ).toJSON();
            }
            return onSuccess(
                createResponsePaging(
                    dto.page_number,
                    dto.item_per_page,
                    user.rows,
                    user.count
                ),
                MESSAGE_RESPONSE.getInfoSuccess,
                200
            );
        } catch (error) {
            return error;
        }
    }
}
