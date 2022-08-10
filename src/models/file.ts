import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    strOfPathColumn,
} from "../config/modelConfig";
import { TFileStatic } from "../interfaces/file";
import { Sequelize } from "sequelize";

export const FileModel = (sequelize: Sequelize): TFileStatic => {
    return <TFileStatic>sequelize.define(
        DEFINE_TABLE.files,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            duong_dan: { ...strOfPathColumn("duong_dan") },
            loai: { ...strOfColumn },
            dung_luong: { ...strOfColumn },

            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
