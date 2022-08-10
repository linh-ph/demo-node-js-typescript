import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    dateOfColumnCastTimeZoneDefault,
} from "../config/modelConfig";
import { TMeetingStatic } from "../interfaces/meeting";
import { Sequelize } from "sequelize";

export const MeetingModel = (sequelize: Sequelize): TMeetingStatic => {
    return <TMeetingStatic>sequelize.define(
        DEFINE_TABLE.meeting,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            ngay_bat_dau: {
                ...dateOfColumnCastTimeZoneDefault("ngay_bat_dau"),
            },
            ngay_ket_thuc: {
                ...dateOfColumnCastTimeZoneDefault("ngay_ket_thuc"),
            },
            dia_diem_id: { ...bigIntForeignOfId },
            chu_tri_id: { ...bigIntForeignOfId },
            thuoc_tinh_id: { ...bigIntForeignOfId },
            mo_ta: { ...strOfColumn },
            file_noi_dung: { ...strOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
