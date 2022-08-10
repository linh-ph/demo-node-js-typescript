import { Service, Inject } from "typedi";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
import { IStatus, TStatusStatic } from "../interfaces";
type IPromiseFindAndCount = Promise<ISearch<IStatus> | null>;
@Service()
export default class StatusServices {
    constructor(
        @Inject("status_model")
        private statusModel: TStatusStatic
    ) {}

    async findByName(name: string): Promise<IStatus | null> {
        try {
            const result = await this.statusModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IStatus): Promise<IStatus | null> {
        try {
            const userCreated = await this.statusModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<IStatus[]> {
        try {
            const result = await this.statusModel.findAll({
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IStatus[]> {
        try {
            const result = await this.statusModel.findOne({
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

    async deleteById(id: number): Promise<boolean | null> {
        try {
            const result = await this.statusModel.update(
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

    async updateById(id: number, instance: IStatus): Promise<boolean | null> {
        try {
            const result = await this.statusModel.update(
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

    async findById(id: number): Promise<IStatus | null> {
        try {
            const result = await this.statusModel.findOne({
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
            const result = await this.statusModel.findAndCountAll({
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
