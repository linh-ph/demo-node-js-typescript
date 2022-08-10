import { Service, Inject } from "typedi";
import { IMeetingMember, TMeetingMemberStatic } from "../interfaces";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
type IPromiseFindAndCount = Promise<ISearch<IMeetingMember> | null>;
@Service()
export default class MeetingMemberService {
    constructor(
        @Inject("meeting_member_model")
        private meetingMemberModel: TMeetingMemberStatic
    ) {}

    async findByName(name: string): Promise<IMeetingMember | null> {
        try {
            const result = await this.meetingMemberModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IMeetingMember): Promise<IMeetingMember | null> {
        try {
            const userCreated = await this.meetingMemberModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<IMeetingMember[]> {
        try {
            const result = await this.meetingMemberModel.findAll({
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
        instance: IMeetingMember
    ): Promise<boolean | null> {
        try {
            const result = await this.meetingMemberModel.update(
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
            const result = await this.meetingMemberModel.update(
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IMeetingMember[]> {
        try {
            const result = await this.meetingMemberModel.findOne({
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

    async findById(id: number): Promise<IMeetingMember | null> {
        try {
            const result = await this.meetingMemberModel.findOne({
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
            const result = await this.meetingMemberModel
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
