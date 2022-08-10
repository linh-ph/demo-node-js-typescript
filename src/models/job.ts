import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    textOfColumn,
    intTinyColumn,
    intOfColumn,
} from "../config/modelConfig";
import { TJobStatic } from "../interfaces/job";
import { Sequelize } from "sequelize";

export const JobModel = (sequelize: Sequelize): TJobStatic => {
    return <TJobStatic>sequelize.define(
        DEFINE_TABLE.jobs,
        {
            id: { ...primaryKeyOfId },
            queue: { ...strOfColumn },
            payload: { ...textOfColumn },
            attempts: { ...intTinyColumn },
            reserved_at: { ...intOfColumn },
            available_at: { ...intOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
