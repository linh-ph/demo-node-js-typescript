import { Service, Inject } from "typedi";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
import { IProperties, IOrganizer, TOrganizerStatic } from "../interfaces";
type IPromiseFindAndCount = Promise<ISearch<IOrganizer> | null>;
@Service()
export default class OrganizerServices {
    constructor(
        @Inject("organizer_model")
        private organizerModel: TOrganizerStatic
    ) {}

    async findByName(name: string): Promise<IOrganizer | null> {
        try {
            const result = await this.organizerModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IOrganizer): Promise<IOrganizer | null> {
        try {
            const userCreated = await this.organizerModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<IOrganizer[]> {
        try {
            const result = await this.organizerModel.findAll({
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
            const result = await this.organizerModel.findOne({
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
            const result = await this.organizerModel.update(
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

    async updateById(
        id: number,
        instance: IOrganizer
    ): Promise<boolean | null> {
        try {
            const result = await this.organizerModel.update(
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

    async findById(id: number): Promise<IOrganizer | null> {
        try {
            const result = await this.organizerModel.findOne({
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
            const result = await this.organizerModel.findAndCountAll({
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
