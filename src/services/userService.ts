/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service, Inject } from "typedi";
import { Op } from "sequelize";
import { IUser, TUserStatic } from "../interfaces/user";
import { IPromiseGeneric, ISearch } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import {
    removePropertiesPassword,
    getPaging,
    isValidUpdate,
    getAssociationGroup,
    createConditionSearchGroup,
    modelToRaw,
    createConditionSearchGeneral,
} from "../helper";
import { SearchAttributeDto } from "../dto/generalDto";
export const KEY_SEARCH = ["ten", "email", "sdt"];

type IPromiseGenericFindAndCount = Promise<ISearch<IUser> | null>;

export const LIST_SEARCH_ATTRIBUTE: string[] = ["ten", "email", "sdt"];

@Service()
class UserService {
    constructor(@Inject("user_model") private userModel: TUserStatic) {}

    async findUserById(id: number): IPromiseGeneric<IUser> {
        try {
            const result = await this.userModel.findOne({
                where: {
                    id: id,
                    deleted_at: null,
                },
                nest: true,
                attributes: {
                    exclude: ["mat_khau"],
                },
                include: [
                    {
                        ...getAssociationGroup(),
                    },
                ],
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findUserAll(
        dto: SearchAttributeDto
    ): Promise<IPromiseGenericFindAndCount> {
        try {
            const result = await this.userModel.findAndCountAll({
                ...getPaging(dto.page_number, dto.item_per_page),
                where: {
                    // ...createConditionSearch(dto),
                    ...createConditionSearchGeneral(dto, KEY_SEARCH),
                    deleted_at: null,
                },

                nest: true,
                attributes: {
                    exclude: ["mat_khau"],
                },
                include: [
                    {
                        ...getAssociationGroup(),
                        where: {
                            ...createConditionSearchGroup(dto),
                            deleted_at: null,
                        },
                    },
                ],
                order: [["ten", "asc"]],
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async updateUserById(id: number, user: IUser): Promise<boolean | null> {
        try {
            const result = await this.userModel.update(
                {
                    ...user,
                    updated_at: getDateTime(),
                },
                {
                    where: {
                        id: id,
                        deleted_at: null,
                    },
                }
            );

            return removePropertiesPassword(modelToRaw(result));
        } catch (error) {
            return null;
        }
    }

    async deleteUserById(id: number): Promise<boolean | null> {
        try {
            const result = await this.userModel.update(
                {
                    deleted_at: getDateTime(),
                },
                {
                    where: {
                        id: id,
                        deleted_at: null,
                    },
                }
            );

            return isValidUpdate(result);
        } catch (error) {
            return null;
        }
    }

    async updatePasswordByEmail(
        password: string,
        email: string
    ): Promise<boolean | null> {
        try {
            const result = await this.userModel.update(
                {
                    mat_khau: password,
                    updated_at: getDateTime(),
                },
                {
                    where: {
                        email: email,
                    },
                }
            );

            return removePropertiesPassword(result);
        } catch (error) {
            return null;
        }
    }

    async findAllEmailNotId(
        email: string,
        id: number
    ): IPromiseGeneric<IUser[]> {
        try {
            const result = await this.userModel.findAll({
                where: {
                    email: email,
                    // deleted_at: null,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findIdDeletedAt(id: number): IPromiseGeneric<IUser[]> {
        try {
            const result = await this.userModel.findOne({
                where: {
                    id: id,
                    [Op.not]: [
                        {
                            deleted_at: null,
                        },
                    ],
                },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findByID(id: number): IPromiseGeneric<IUser> {
        try {
            const result = await this.userModel.findOne({
                where: {
                    id: id,
                },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findAllUserDeleteAt(): IPromiseGeneric<IUser[]> {
        try {
            const result = await this.userModel.findAll({
                where: {
                    [Op.not]: [
                        {
                            deleted_at: null,
                        },
                    ],
                },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findAllPhoneNotId(
        phone: string,
        id: number
    ): IPromiseGeneric<IUser[]> {
        try {
            const result = await this.userModel.findAll({
                where: {
                    sdt: phone,
                    // deleted_at: null,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                    // deleted_at: null,
                },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findUserByEmailUnsafe(email: string): IPromiseGeneric<IUser> {
        try {
            const result = await this.userModel.findOne({
                where: { email: email, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findUserByPhone(phone: string): IPromiseGeneric<IUser> {
        try {
            const result = await this.userModel.findOne({
                where: { sdt: phone, deleted_at: null },
                logging: console.log,
            });

            return modelToRaw(result);
        } catch (e) {
            console.log("%cuserService.ts line:235 e", "color: #007acc;", e);
            return null;
        }
    }

    async createUser(user: IUser): IPromiseGeneric<IUser> {
        try {
            const userCreated = await this.userModel.create(user);
            return removePropertiesPassword(modelToRaw(userCreated));
        } catch (e) {
            console.log("%cuserService.ts line:306 e", "color: #007acc;", e);
            return null;
        }
    }

    async deleteAllUserByGroupID(groupId: number): Promise<boolean | null> {
        try {
            const result = await this.userModel.update(
                {
                    deleted_at: getDateTime(),
                },
                {
                    where: {
                        nhom_id: groupId,
                        deleted_at: null,
                    },
                }
            );

            return isValidUpdate(result);
        } catch (error) {
            console.log("%cuserRepository.ts line:50 error", error);
            return null;
        }
    }

    async findUserByTypeId(
        fieldId: string,
        typeId: number
    ): Promise<IUser | null> {
        try {
            const result = await this.userModel.findOne({
                where: {
                    [fieldId]: typeId,
                },
            });

            return modelToRaw(result);
        } catch (error) {
            return null;
        }
    }

    async deleteAllEventByTypeId(typeId: number): Promise<boolean | null> {
        try {
            const result = await this.userModel.update(
                {
                    deleted_at: getDateTime(),
                },
                {
                    where: {
                        nhom_id: typeId,
                        deleted_at: null,
                    },
                }
            );

            return isValidUpdate(result);
        } catch (error) {
            return null;
        }
    }
}

export default UserService;
