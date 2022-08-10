import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    intTinyColumn,
    bigIntForeignOfId,
    dateOfColumnCastTimeZone,
    dateOfColumnCastTimeZoneDefault,
} from "../config/modelConfig";
import { TUserStatic } from "../interfaces/user";
import { Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize): TUserStatic => {
    return <TUserStatic>sequelize.define(
        DEFINE_TABLE.user,
        {
            id: { ...primaryKeyOfId },
            ten: { ...strOfColumn },
            email: { ...strOfColumn },
            chuc_vu: { ...strOfColumn },
            phan_quyen: { ...strOfColumn },
            mat_khau: { ...strOfColumn },
            remember_token: { ...strOfColumn },
            sdt: { ...strOfColumn },
            gioi_tinh: { ...strOfColumn },
            nhom_id: { ...bigIntForeignOfId },
            ngay_tham_gia: {
                ...dateOfColumnCastTimeZoneDefault("ngay_tham_gia"),
            },
            kich_hoat: { ...intTinyColumn, defaultValue: 0 },
            don_vi: { ...strOfColumn },
            anh_dai_dien: { ...strOfColumn },
            file_chu_ky: { ...strOfColumn },
            chu_ky_sms: { ...intTinyColumn, defaultValue: 0 },
            chu_ky_email: { ...intTinyColumn, defaultValue: 0 },
            ...getRecordTimeStamp(),
        },
        {
            ...modelConfig,
        }
    );
};
