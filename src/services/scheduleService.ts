import { Service, Inject } from "typedi";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import {
    getAssociationDivision,
    getAssociationMeetingMember,
    isValidUpdate,
    modelToRaw,
} from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
import { TScheduleStatic, ISchedule } from "../interfaces";
type IPromiseFindAndCount = Promise<ISearch<ISchedule> | null>;
@Service()
export default class ScheduleService {
    constructor(
        @Inject("schedule_model") private scheduleModel: TScheduleStatic
    ) {}

    async findByName(name: string): Promise<ISchedule | null> {
        try {
            const result = await this.scheduleModel.findOne({
                ...defaultQueryOption,
                where: { tieu_de: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: ISchedule): Promise<ISchedule | null> {
        try {
            const userCreated = await this.scheduleModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        name: string,
        id: number
    ): IPromiseGeneric<ISchedule[]> {
        try {
            const result = await this.scheduleModel.findAll({
                raw: true,
                where: {
                    tieu_de: name,
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

    async updateById(id: number, instance: ISchedule): Promise<boolean | null> {
        try {
            const result = await this.scheduleModel.update(
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
            const result = await this.scheduleModel.update(
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

    async findIdDeletedAt(id: number): IPromiseGeneric<ISchedule[]> {
        try {
            const result = await this.scheduleModel.findOne({
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

    async findById(id: number): Promise<ISchedule | null> {
        try {
            const result = await this.scheduleModel.findOne({
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
            const result = await this.scheduleModel
                .scope("notDeleted")
                .findAndCountAll({
                    ...defaultQueryOption,
                    ...orderStringColumn("tieu_de"),
                    include: [
                        {
                            ...getAssociationDivision(),
                            where: {
                                // ...createConditionSearchGroup(dto),
                                deleted_at: null,
                            },
                        },
                        {
                            ...getAssociationMeetingMember(),
                            where: {
                                // ...createConditionSearchGroup(dto),
                                deleted_at: null,
                            },
                        },
                    ],
                });
            console.log(
                "%cscheduleService.ts line:162 object",
                "color: #007acc;",
                result
            );
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }
}
