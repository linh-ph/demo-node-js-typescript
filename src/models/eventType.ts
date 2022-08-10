import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
} from "../config/modelConfig";
import { TEventTypeStatic } from "../interfaces/eventType";
import { Sequelize } from "sequelize";

export const EventTypeModel = (sequelize: Sequelize): TEventTypeStatic => {
    return <TEventTypeStatic>sequelize.define(
        DEFINE_TABLE.eventType,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
