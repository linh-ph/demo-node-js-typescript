import { Service, Inject } from "typedi";
import { TNatureStatic } from "../interfaces/nature";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
import { INature } from "../interfaces/nature";
type IPromiseFindAndCount = Promise<ISearch<INature> | null>;
@Service()
export default class NatureService {
    constructor(@Inject("nature_model") private natureModel: TNatureStatic) {}

    async findByName(name: string): Promise<INature | null> {
        try {
            const result = await this.natureModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: INature): Promise<INature | null> {
        try {
            const userCreated = await this.natureModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findIdDeletedAt(id: number): IPromiseGeneric<INature[]> {
        try {
            const result = await this.natureModel.findOne({
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

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<INature[]> {
        try {
            const result = await this.natureModel.findAll({
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

    async deleteById(id: number): Promise<boolean | null> {
        try {
            const result = await this.natureModel.update(
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

    async updateById(id: number, instance: INature): Promise<boolean | null> {
        try {
            const result = await this.natureModel.update(
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

    async findById(id: number): Promise<INature | null> {
        try {
            const result = await this.natureModel.findOne({
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
            const result = await this.natureModel.findAndCountAll({
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
