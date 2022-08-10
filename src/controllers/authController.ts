import {
    Controller,
    Body,
    Post,
    HttpCode,
    JsonController,
    Res,
    Req,
} from "routing-controllers";
import { Response, Request } from "express";
import { Service } from "typedi";
import TokenService from "../services/tokenService";
import UserService from "../services/userService";
import {
    LoginDto,
    RegisterDto,
    RefreshTokenDto,
    BaseAuth,
} from "../dto/authDto";
import { ResponseError } from "../helper/error";
import { IUser } from "../interfaces/user";
import { IToken } from "../interfaces/token";
import {
    createTokenByUser,
    getDecodeToken,
    getTokenFromRequestHeader,
} from "../helper/token";
import {
    onSuccess,
    isCompareValidPasswordByBcrypt,
    sendResponseHeader,
    getPasswordHashByBcrypt,
} from "../helper";
import MESSAGE_RESPONSE from "../constraints";
import Settings from "../config";
import { PrefixRoute } from "../helper/role";
const DEFAULT_PASSWORD_USER = Settings.password_default;
const DEFAULT_PREFIX = PrefixRoute.AUTH;
import Logger from "../helper/logger";

@Controller(DEFAULT_PREFIX)
@JsonController()
@Service()
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    @Post("/login")
    async login(
        @Body() dto: LoginDto,
        @Res() res: Response
    ): Promise<{ [key: string]: unknown } | string | null> {
        try {
            const user = await this.userService.findUserByEmailUnsafe(
                dto.email
            );

            if (!user) {
                throw new ResponseError(
                    404,
                    MESSAGE_RESPONSE.userNotFound
                ).toJSON();
            }

            const isValidPassword = await isCompareValidPasswordByBcrypt(
                user.mat_khau,
                dto.mat_khau
            );

            if (!isValidPassword) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.passwordWrong
                ).toJSON();
            }

            const { accessToken, refreshToken, expiresIn } =
                createTokenByUser(user);
            sendResponseHeader(res, accessToken);

            const token: IToken = {
                nguoi_tao_id: user.id,
                token: accessToken,
            };
            const isSaveToken = await this.tokenService.createToken(token);
            if (!isSaveToken) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.tokenSaveFailed
                ).toJSON();
            }

            Logger.onLoggerInfo(
                "Id login Success: [" + token.nguoi_tao_id + "]"
            );
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn,
                status: 200,
            };
        } catch (error) {
            return error;
        }
    }

    @Post("/forgot")
    @HttpCode(201)
    async update(@Body() dto: BaseAuth): Promise<{ [key: string]: unknown }> {
        try {
            const user = await this.userService.findUserByEmailUnsafe(
                dto.email
            );
            if (!user) {
                throw new ResponseError(
                    404,
                    MESSAGE_RESPONSE.userNotFound
                ).toJSON();
            }

            const hashPassword = await getPasswordHashByBcrypt(
                DEFAULT_PASSWORD_USER
            );

            const isUpdate = await this.userService.updatePasswordByEmail(
                dto.email,
                hashPassword
            );
            if (!isUpdate) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.resetPasswordFailed
                ).toJSON();
            }

            return onSuccess(null, MESSAGE_RESPONSE.resetPasswordSuccess, 200);
        } catch (error) {
            console.log("%cauthController.ts line:86 object", error);
            return error;
        }
    }

    @Post("/register")
    @HttpCode(201)
    async register(
        @Body() dto: RegisterDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            const userFoundEmail = await this.userService.findUserByEmailUnsafe(
                dto.email
            );
            if (userFoundEmail) {
                throw new ResponseError(
                    400,
                    "Email " + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            const userFoundPhone = await this.userService.findUserByPhone(
                dto.sdt
            );
            if (userFoundPhone) {
                throw new ResponseError(
                    400,
                    "SDT " + MESSAGE_RESPONSE.exists
                ).toJSON();
            }

            const hashPassword = await getPasswordHashByBcrypt(dto.mat_khau);
            const user: IUser = {
                ...dto,
                mat_khau: hashPassword,
            };

            const savedUser = await this.userService.createUser(user);
            if (!savedUser) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.registerFailed
                ).toJSON();
            }
            return onSuccess(savedUser, MESSAGE_RESPONSE.addSuccess, 200);
        } catch (error) {
            console.log("%cauthController.ts line:86 object", error);
            return error;
        }
    }

    @Post("/refresh")
    @HttpCode(201)
    async refresh(
        @Body() dto: RefreshTokenDto
    ): Promise<{ [key: string]: unknown }> {
        try {
            const { refresh_token } = dto;

            const decode = getDecodeToken(
                refresh_token,
                process.env.SECRET_JWT_REFRESH_TOKEN as string
            );

            if (!decode.success) {
                throw new ResponseError(
                    400,
                    MESSAGE_RESPONSE.refreshTokenWrong
                ).toJSON();
            }

            const { decoded } = decode;

            const { accessToken, refreshToken, expiresIn } = createTokenByUser(
                decoded as IUser
            );

            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                expiresIn: expiresIn,
                status: 200,
            };
        } catch (error) {
            console.log("%cauthController.ts line:86 object", error);
            return error;
        }
    }

    @Post("/logout")
    async logout(@Req() req: Request): Promise<{ [key: string]: unknown }> {
        try {
            const token = getTokenFromRequestHeader(req);

            if (!token) {
                throw new ResponseError(
                    404,
                    MESSAGE_RESPONSE.tokenNotFound
                ).toJSON();
            }

            const user = await this.tokenService.softDeleteByToken(token);

            if (!user) {
                throw new ResponseError(
                    404,
                    MESSAGE_RESPONSE.userNotFound
                ).toJSON();
            }

            return onSuccess(null, MESSAGE_RESPONSE.tokenRemoved, 200);
        } catch (error) {
            console.log("%cauthController.ts line:86 object", error);
            return error;
        }
    }
}
