import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    modelConfig,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TStatusStatic } from "../interfaces/status";

export const StatusModel = (sequelize: Sequelize): TStatusStatic => {
    return <TStatusStatic>sequelize.define(
        DEFINE_TABLE.status,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
