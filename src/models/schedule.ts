import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    dateOfColumnCastTimeZoneDefault,
    timeOfColumn,
} from "../config/modelConfig";
import { TScheduleStatic } from "../interfaces/schedule";
import { Sequelize, Op } from "sequelize";

export const ScheduleModel = (sequelize: Sequelize): TScheduleStatic => {
    return <TScheduleStatic>sequelize.define(
        DEFINE_TABLE.schedule,
        {
            id: { ...primaryKeyOfId },
            phan_ban_id: { ...bigIntForeignOfId },
            tieu_de: { ...strOfColumn },
            dien_gia_id: { ...bigIntForeignOfId },
            cuoc_hop_id: { ...bigIntForeignOfId },
            ngay_dien_ra: {
                ...dateOfColumnCastTimeZoneDefault("ngay_dien_ra"),
            },
            gio_bat_dau: { ...timeOfColumn },
            gio_ket_thuc: {
                ...timeOfColumn,
            },
            mo_ta: { ...strOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
