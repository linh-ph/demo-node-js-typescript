import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    modelConfig,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TDocumentStatic } from "../interfaces/document";

export const DocumentModel = (sequelize: Sequelize): TDocumentStatic => {
    return <TDocumentStatic>sequelize.define(
        DEFINE_TABLE.document,
        {
            id: { ...primaryKeyOfId },
            tieu_de: { ...strOfColumn },
            dien_gia_id: { ...bigIntForeignOfId },
            sdt: { ...strOfColumn },
            tinh_trang_id: { ...bigIntForeignOfId },
            tai_lieu_id: { ...bigIntForeignOfId },
            lich_trinh_id: { ...bigIntForeignOfId },
            cuoc_hop_id: { ...bigIntForeignOfId },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
