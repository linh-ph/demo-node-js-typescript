import { Service, Inject } from "typedi";
import { IGroup, TGroupStatic } from "../interfaces/group";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
type IPromiseFindAndCount = Promise<ISearch<IGroup> | null>;
@Service()
export default class GroupService {
    constructor(@Inject("group_model") private groupModel: TGroupStatic) {}

    async findByName(name: string): Promise<IGroup | null> {
        try {
            const result = await this.groupModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IGroup): Promise<IGroup | null> {
        try {
            const userCreated = await this.groupModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(ten: string, id: number): IPromiseGeneric<IGroup[]> {
        try {
            const result = await this.groupModel.findAll({
                raw: true,
                where: {
                    ten: ten,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                    deleted_at: null,
                },
                logging: console.log,
            });
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async updateById(id: number, instance: IGroup): Promise<boolean | null> {
        try {
            const result = await this.groupModel.update(
                {
                    ...instance,
                    updated_at: getDateTime(),
                },
                {
                    where: {
                        id: id,
                        deleted_at: null,
                    },
                }
            );

            return isValidUpdate(result);
        } catch (err) {
            return null;
        }
    }

    async deleteById(id: number): Promise<boolean | null> {
        try {
            const result = await this.groupModel.update(
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IGroup[]> {
        try {
            const result = await this.groupModel.findOne({
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

    async findById(id: number): Promise<IGroup | null> {
        try {
            const result = await this.groupModel.findOne({
                ...defaultQueryOption,
                where: { id: id, deleted_at: null },
            });
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findAll(): Promise<IPromiseFindAndCount> {
        try {
            const result = await this.groupModel.findAndCountAll({
                ...defaultQueryOption,
                ...orderStringColumn("ten"),
                where: {
                    deleted_at: null,
                },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }
}
