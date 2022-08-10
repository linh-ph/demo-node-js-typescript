import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    modelConfig,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TNatureStatic } from "../interfaces/nature";

export const NatureModel = (sequelize: Sequelize): TNatureStatic => {
    return <TNatureStatic>sequelize.define(
        DEFINE_TABLE.nature,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },

            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
