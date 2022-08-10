import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IDocumentNotes extends ITimeStamp {
  tai_lieu_cuoc_hop_id?: number;
  nguoi_dung_id?: number;
  trang_thai?: string;
  noi_dung?: string;
}

export interface IDocumentNotesModel extends Model, IDocumentNotes {}
export type TDocumentNotesStatic = typeof Model & {
  new (
    value?: Record<string, unknown>,
    options?: BuildOptions
  ): IDocumentNotesModel;
};
