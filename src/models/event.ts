import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    intTinyColumn,
    bigIntForeignOfId,
    intOfColumn,
    dateOfColumnCastTimeZoneDefault,
    strOfPathColumn,
} from "../config/modelConfig";
import { TEventStatic } from "../interfaces/event";
import { Sequelize } from "sequelize";

export const EventModel = (sequelize: Sequelize): TEventStatic => {
    return <TEventStatic>sequelize.define(
        DEFINE_TABLE.event,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            so_luong: { ...intOfColumn },
            nha_to_chuc_id: { ...bigIntForeignOfId },
            ngay_bat_dau: {
                ...dateOfColumnCastTimeZoneDefault("ngay_bat_dau"),
            },
            ngay_ket_thuc: {
                ...dateOfColumnCastTimeZoneDefault("ngay_ket_thuc"),
            },
            loai_su_kien_id: { ...bigIntForeignOfId },
            tinh_chat_id: { ...bigIntForeignOfId },
            tinh_trang_id: { ...bigIntForeignOfId },
            thuoc_tinh_id: { ...bigIntForeignOfId },
            chu_de: { ...strOfColumn },
            thu_moi_id: { ...bigIntForeignOfId },
            ma_qr: { ...strOfColumn },
            link_qr: { ...strOfPathColumn("link_qr") },
            da_du_noi_dung: { ...intTinyColumn, defaultValue: 0 },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
