import {
    modelConfig,
    getRecordTimeStamp,
    primaryKeyOfId,
    DEFINE_TABLE,
    textOfColumn,
    dateOfColumnCastTimeZoneDefault,
} from "../config/modelConfig";
import { TFailedJobStatic } from "../interfaces/failedJob";
import { Sequelize } from "sequelize";

export const FailedJobModel = (sequelize: Sequelize): TFailedJobStatic => {
    return <TFailedJobStatic>sequelize.define(
        DEFINE_TABLE.failedJob,
        {
            id: { ...primaryKeyOfId },
            connection: { ...textOfColumn },
            queue: { ...textOfColumn },
            payload: { ...textOfColumn },
            exception: { ...textOfColumn },
            failed_at: { ...dateOfColumnCastTimeZoneDefault("failed_at") },

            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
