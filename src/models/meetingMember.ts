import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    modelConfig,
    intTinyColumn,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TMeetingMemberStatic } from "../interfaces/meetingMember";

export const MeetingMemberModel = (
    sequelize: Sequelize
): TMeetingMemberStatic => {
    return <TMeetingMemberStatic>sequelize.define(
        DEFINE_TABLE.meetingMember,
        {
            id: { ...primaryKeyOfId },
            cuoc_hop_id: { ...bigIntForeignOfId },
            nguoi_dung_id: { ...bigIntForeignOfId },
            vi_tri: { ...strOfColumn },
            trang_thai: { ...strOfColumn },
            ghi_chu: { ...strOfColumn },
            chu_tri: { ...intTinyColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
