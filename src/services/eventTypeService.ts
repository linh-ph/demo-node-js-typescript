import { Service, Inject } from "typedi";
import { TGroupStatic } from "../interfaces/group";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
import { TEventTypeStatic } from "../interfaces";
import { IEventType } from "../interfaces/eventType";
type IPromiseFindAndCount = Promise<ISearch<IEventType> | null>;
@Service()
class EventTypeService {
    constructor(
        @Inject("group_model") private groupModel: TGroupStatic,
        @Inject("event_type_model") private eventTypeModel: TEventTypeStatic
    ) {}

    async findEventTypeByName(name: string): Promise<IEventType | null> {
        try {
            const result = await this.eventTypeModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async createEventType(eventType: IEventType): Promise<IEventType | null> {
        try {
            const userCreated = await this.eventTypeModel.create(eventType);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<IEventType[]> {
        try {
            const result = await this.eventTypeModel.findAll({
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
            const result = await this.eventTypeModel.update(
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IEventType[]> {
        try {
            const result = await this.eventTypeModel.findOne({
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

    async updateEventTypeById(
        id: number,
        event: IEventType
    ): Promise<boolean | null> {
        try {
            const result = await this.eventTypeModel.update(
                {
                    ...event,
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

    async findEventTypeById(id: number): Promise<IEventType | null> {
        try {
            const result = await this.eventTypeModel.findOne({
                ...defaultQueryOption,
                where: { id: id, deleted_at: null },
            });
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findEventTypeAll(): Promise<IPromiseFindAndCount> {
        try {
            const result = await this.eventTypeModel.findAndCountAll({
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

export default EventTypeService;
