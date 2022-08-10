import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IMeetingDocument extends ITimeStamp {
    tieu_de?: string;
    tinh_trang?: string;
    phe_duyet?: number;
    loi_nhan?: string;
    tai_lieu_id?: number;
    cuoc_hop_id?: number;
}

export interface IMeetingDocumentModel extends Model, IMeetingDocument {}
export type TMeetingDocumentStatic = typeof Model & {
    new (
        value?: Record<string, unknown>,
        options?: BuildOptions
    ): IMeetingDocumentModel;
};
