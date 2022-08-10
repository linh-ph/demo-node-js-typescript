import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    modelConfig,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TDocumentApprovalStatic } from "../interfaces/documentApproval";

export const DocumentApprovalModel = (
    sequelize: Sequelize
): TDocumentApprovalStatic => {
    return <TDocumentApprovalStatic>sequelize.define(
        DEFINE_TABLE.documentApproval,
        {
            id: { ...primaryKeyOfId },
            tai_lieu_cuoc_hop_id: { ...bigIntForeignOfId },
            nguoi_dung_id: { ...bigIntForeignOfId },
            trang_thai: { ...strOfColumn },
            ly_do: { ...strOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
