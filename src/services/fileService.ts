import { Service, Inject } from "typedi";
import { ISearch, IPromiseGeneric } from "../interfaces/general";
import { getDateTime } from "../helper/utils";
import { isValidUpdate, modelToRaw } from "../helper";
import { defaultQueryOption, orderDateDesc } from "../config/modelConfig";
import { Op } from "sequelize";
import { TFileStatic, IFile } from "../interfaces/file";
type IPromiseFindAndCount = Promise<ISearch<IFile> | null>;

@Service()
export default class FileService {
    constructor(
        @Inject("file_model")
        private fileModel: TFileStatic
    ) {}

    async findByName(name: string): Promise<IFile | null> {
        try {
            const result = await this.fileModel.findOne({
                ...defaultQueryOption,
                where: { ten: name, deleted_at: null },
            });

            return modelToRaw(result);
        } catch (e) {
            return null;
        }
    }

    async create(instance: IFile): Promise<IFile | null> {
        try {
            const created = await this.fileModel.create(instance);
            return modelToRaw(created);
        } catch (e) {
            return null;
        }
    }

    async findAllNameNotId(ten: string, id: number): IPromiseGeneric<IFile[]> {
        try {
            const result = await this.fileModel.findAll({
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

    async updateById(id: number, instance: IFile): Promise<boolean | null> {
        try {
            const result = await this.fileModel.update(
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
            const result = await this.fileModel.update(
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

    async findIdDeletedAt(id: number): IPromiseGeneric<IFile[]> {
        try {
            const result = await this.fileModel.findOne({
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

    async findById(id: number): Promise<IFile | null> {
        try {
            const result = await this.fileModel.findOne({
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
            const result = await this.fileModel.findAndCountAll({
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
