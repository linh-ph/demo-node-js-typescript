import { Service, Inject } from "typedi";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
import { INature } from "../interfaces/nature";
import { TPropertiesStatic, IProperties } from "../interfaces";
type IPromiseFindAndCount = Promise<ISearch<INature> | null>;
@Service()
class PropertiesServices {
    constructor(
        @Inject("properties_model") private propertiesModel: TPropertiesStatic
    ) {}

    async findByName(name: string): Promise<INature | null> {
        try {
            const result = await this.propertiesModel.findOne({
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
            const userCreated = await this.propertiesModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<INature[]> {
        try {
            const result = await this.propertiesModel.findAll({
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IProperties[]> {
        try {
            const result = await this.propertiesModel.findOne({
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
            const result = await this.propertiesModel.update(
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
            const result = await this.propertiesModel.update(
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
            const result = await this.propertiesModel.findOne({
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
            const result = await this.propertiesModel.findAndCountAll({
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

export default PropertiesServices;
