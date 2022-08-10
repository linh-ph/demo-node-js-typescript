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
import { TMeetingDocumentStatic } from "../interfaces/meetingDocument";

export const MeetingDocumentModel = (
    sequelize: Sequelize
): TMeetingDocumentStatic => {
    return <TMeetingDocumentStatic>sequelize.define(
        DEFINE_TABLE.meetingDocument,
        {
            id: { ...primaryKeyOfId },
            tieu_de: { ...strOfColumn },
            tinh_trang: { ...strOfColumn },
            phe_duyet: { ...intTinyColumn },
            loi_nhan: { ...strOfColumn },
            tai_lieu_id: { ...bigIntForeignOfId },
            cuoc_hop_id: { ...bigIntForeignOfId },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
