import { Service, Inject } from "typedi";
import { IGroup, TGroupStatic } from "../interfaces/group";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderDateDesc } from "../config/modelConfig";
import { Op } from "sequelize";
import { IBannerEvent, TBannerEventStatic } from "../interfaces/bannerEvent";
type IPromiseFindAndCount = Promise<ISearch<IGroup> | null>;
@Service()
export default class BannerEventService {
    constructor(
        @Inject("banner_event_model")
        private bannerEventModel: TBannerEventStatic
    ) {}

    async findByName(name: string): Promise<IGroup | null> {
        try {
            const result = await this.bannerEventModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: Array<IBannerEvent>): Promise<IGroup | null> {
        try {
            const userCreated = await this.bannerEventModel.bulkCreate(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(ten: string, id: number): IPromiseGeneric<IGroup[]> {
        try {
            const result = await this.bannerEventModel.findAll({
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

    async updateById(
        id: number,
        instance: IBannerEvent
    ): Promise<boolean | null> {
        try {
            const result = await this.bannerEventModel.update(
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
            console.log(
                "%cbannerEventService.ts line:79 object",
                "color: #007acc;",
                result
            );
            return isValidUpdate(result);
        } catch (err) {
            return null;
        }
    }

    async deleteById(id: number): Promise<boolean | null> {
        try {
            const result = await this.bannerEventModel.update(
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
            const result = await this.bannerEventModel.findOne({
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

    async findIdExist(id: number): IPromiseGeneric<IGroup[]> {
        try {
            const result = await this.bannerEventModel.findOne({
                where: {
                    id: id,
                },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findById(id: number): Promise<IGroup | null> {
        try {
            const result = await this.bannerEventModel.findOne({
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
            const result = await this.bannerEventModel.findAndCountAll({
                ...defaultQueryOption,
                ...orderDateDesc,
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
