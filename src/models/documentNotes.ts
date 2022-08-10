import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    modelConfig,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TDocumentNotesStatic } from "../interfaces/documentNotes";

export const DocumentNotesModel = (
    sequelize: Sequelize
): TDocumentNotesStatic => {
    return <TDocumentNotesStatic>sequelize.define(
        DEFINE_TABLE.documentApproval,
        {
            id: { ...primaryKeyOfId },
            tai_lieu_cuoc_hop_id: { ...bigIntForeignOfId },
            nguoi_dung_id: { ...bigIntForeignOfId },
            trang_thai: { ...strOfColumn },
            noi_dung: { ...strOfColumn },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
