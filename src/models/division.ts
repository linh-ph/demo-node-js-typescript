import {
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    getRecordTimeStamp,
    modelConfig,
} from "../config/modelConfig";
import { Sequelize, Op } from "sequelize";
import { TDivisionStatic } from "../interfaces";

export const DivisionModel = (sequelize: Sequelize): TDivisionStatic => {
    return <TDivisionStatic>sequelize.define(
        DEFINE_TABLE.division,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
