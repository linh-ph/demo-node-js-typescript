import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    intOfColumn,
    bigIntForeignOfId,
} from "../config/modelConfig";
import { TLocationStatic } from "../interfaces/location";
import { Sequelize } from "sequelize";

export const LocationModel = (sequelize: Sequelize): TLocationStatic => {
    return <TLocationStatic>sequelize.define(
        DEFINE_TABLE.location,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            quan_ly_id: { ...bigIntForeignOfId },
            dia_chi: { ...strOfColumn },
            sdt: { ...strOfColumn },
            suc_chua: { ...intOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
