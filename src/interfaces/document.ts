import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";

export interface IDocument extends ITimeStamp {
    tieu_de?: number;
    dien_gia_id?: number;
    sdt?: string;
    tinh_trang_id?: number;
    tai_lieu_id?: number;
    lich_trinh_id?: number;
}

export interface IDocumentModel extends Model, IDocument {}
export type TDocumentStatic = typeof Model & {
    new (
        value?: Record<string, unknown>,
        options?: BuildOptions
    ): IDocumentModel;
};
