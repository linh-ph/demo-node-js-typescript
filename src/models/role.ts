import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    modelConfig,
    dateOfColumnCastTimeZone,
    dateOfColumnCastTimeZoneDefault,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TRoleStatic } from "../interfaces/role";

export const RoleModel = (sequelize: Sequelize): TRoleStatic => {
    return <TRoleStatic>sequelize.define(
        DEFINE_TABLE.nature,
        {
            id: { ...primaryKeyOfId },
            ten_vai_tro: { ...strOfColumn },
            ngay_tao: { ...dateOfColumnCastTimeZoneDefault("ngay_tao") },
            nguoi_tao_id: { ...bigIntForeignOfId },

            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
