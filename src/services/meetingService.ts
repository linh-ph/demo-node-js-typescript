import { Service, Inject } from "typedi";
import { IMeeting, TMeetingMemberStatic, TMeetingStatic } from "../interfaces";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
type IPromiseFindAndCount = Promise<ISearch<IMeeting> | null>;
@Service()
export default class MeetingService {
    constructor(
        @Inject("meeting_model")
        private meetingModel: TMeetingStatic
    ) {}

    async findByName(name: string): Promise<IMeeting | null> {
        try {
            const result = await this.meetingModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IMeeting): Promise<IMeeting | null> {
        try {
            const userCreated = await this.meetingModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<IMeeting[]> {
        try {
            const result = await this.meetingModel.findAll({
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

    async updateById(id: number, instance: IMeeting): Promise<boolean | null> {
        try {
            const result = await this.meetingModel.update(
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
            const result = await this.meetingModel.update(
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IMeeting[]> {
        try {
            const result = await this.meetingModel.findOne({
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

    async findById(id: number): Promise<IMeeting | null> {
        try {
            const result = await this.meetingModel.findOne({
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
            const result = await this.meetingModel
                .scope("notDeleted")
                .findAndCountAll({
                    ...defaultQueryOption,
                    // ...orderStringColumn("ten"),
                });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }
}
