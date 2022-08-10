import { Service, Inject } from "typedi";
import { IEvent, TEventStatic } from "../interfaces/event";
import { IPromiseGeneric, ISearch } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import {
    isValidUpdate,
    getPaging,
    modelToRaw,
    getAssociationEventType,
    getAssociationNature,
    getAssociationProperties,
    getAssociationBannerEvent,
    getAssociationOrganizer,
    getAssociationStatus,
    getAssociationFile,
} from "../helper";
import { defaultQueryOption } from "../config/modelConfig";
import { SearchAttributeDto } from "../dto/generalDto";
import { Op } from "sequelize";
type IPromiseFindAndCount = Promise<ISearch<IEvent> | null>;

const getIncludeForeignEvent = (): Array<any> => {
    return [
        {
            ...getAssociationEventType(),
            where: {
                deleted_at: null,
            },
        },
        {
            ...getAssociationNature(),
            where: {
                deleted_at: null,
            },
        },
        {
            ...getAssociationProperties(),
            where: {
                deleted_at: null,
            },
        },
        {
            ...getAssociationBannerEvent(),
            where: {
                deleted_at: null,
            },
            required: false,
        },
        {
            ...getAssociationOrganizer(),
            where: {
                deleted_at: null,
            },
        },
        {
            ...getAssociationStatus(),
            where: {
                deleted_at: null,
            },
        },
        // {
        //     ...getAssociationFile(),
        //     where: {
        //         deleted_at: null,
        //     },
        //     required: false,
        // },
    ];
};

@Service()
class EventService {
    constructor(@Inject("event_model") private eventModel: TEventStatic) {}

    async findByName(name: string): Promise<IEvent | null> {
        try {
            const result = await this.eventModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IEvent): Promise<IEvent | null> {
        try {
            const userCreated = await this.eventModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async updateById(id: number, instance: IEvent): Promise<boolean | null> {
        try {
            const result = await this.eventModel.update(
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
            const result = await this.eventModel.update(
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

    async findByTypeId(
        fieldId: string,
        typeId: number
    ): Promise<IEvent | null> {
        try {
            const result = await this.eventModel.findOne({
                where: {
                    [fieldId]: typeId,
                },
            });

            return modelToRaw(result);
        } catch (error) {
            return null;
        }
    }

    async deleteAllByTypeId(
        fieldName: string,
        typeId: number
    ): Promise<boolean | null> {
        try {
            const result = await this.eventModel.update(
                {
                    deleted_at: getDateTime(),
                },
                {
                    where: {
                        [fieldName]: typeId,
                        deleted_at: null,
                    },
                }
            );

            return isValidUpdate(result);
        } catch (error) {
            return null;
        }
    }

    async findById(id: number): Promise<IEvent | null> {
        try {
            const result = await this.eventModel.scope("notDeleted").findOne({
                ...defaultQueryOption,
                where: { id: id },
                include: getIncludeForeignEvent(),
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findAll(dto: SearchAttributeDto): Promise<IPromiseFindAndCount> {
        try {
            const result = await this.eventModel
                .scope("notDeleted")
                .findAndCountAll({
                    ...getPaging(dto.page_number, dto.item_per_page),
                    nest: true,
                    include: getIncludeForeignEvent(),
                    order: [["id", "desc"]],
                    logging: console.log,
                });
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async findIdDeletedAt(id: number): IPromiseGeneric<IEvent[]> {
        try {
            const result = await this.eventModel.findOne({
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

    async findAllTenNotId(ten: string, id: number): IPromiseGeneric<Event[]> {
        try {
            const result = await this.eventModel.findAll({
                where: {
                    ten: ten,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                },
                logging: console.log,
            });
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }
}

export default EventService;
