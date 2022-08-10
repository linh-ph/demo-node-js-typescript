import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IDocumentApproval extends ITimeStamp {
  tai_lieu_cuoc_hop_id?: number;
  nguoi_dung_id?: number;
  trang_thai?: string;
  ly_do?: string;
}

export interface IDocumentApprovalModel extends Model, IDocumentApproval {}
export type TDocumentApprovalStatic = typeof Model & {
  new (
    value?: Record<string, unknown>,
    options?: BuildOptions
  ): IDocumentApprovalModel;
};
