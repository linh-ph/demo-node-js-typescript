import { Service, Inject } from "typedi";
import { IDivision, TDivisionStatic } from "../interfaces";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderStringColumn } from "../config/modelConfig";
import { Op } from "sequelize";
type IPromiseFindAndCount = Promise<ISearch<IDivision> | null>;
@Service()
export default class DivisionService {
    constructor(
        @Inject("division_model") private divisionModel: TDivisionStatic
    ) {}

    async findByName(name: string): Promise<IDivision | null> {
        try {
            const result = await this.divisionModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IDivision): Promise<IDivision | null> {
        try {
            const userCreated = await this.divisionModel.create(instance);
            return modelToRaw(userCreated);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(
        ten: string,
        id: number
    ): IPromiseGeneric<IDivision[]> {
        try {
            const result = await this.divisionModel.findAll({
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

    async updateById(id: number, instance: IDivision): Promise<boolean | null> {
        try {
            const result = await this.divisionModel.update(
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
            const result = await this.divisionModel.update(
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IDivision[]> {
        try {
            const result = await this.divisionModel.findOne({
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

    async findById(id: number): Promise<IDivision | null> {
        try {
            const result = await this.divisionModel.findOne({
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
            const result = await this.divisionModel
                .scope("notDeleted")
                .findAndCountAll({
                    ...defaultQueryOption,
                    ...orderStringColumn("ten"),
                    // where: {
                    //     deleted_at: null,
                    // },
                });
            console.log(
                "%cdivisionService.ts line:144 object",
                "color: #007acc;",
                result
            );
            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }
}
