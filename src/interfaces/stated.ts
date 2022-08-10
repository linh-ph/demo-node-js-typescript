import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IStated extends ITimeStamp {
  cuoc_hop_id?: number;
  nguoi_dung_id?: number;
  trang_thai?: string;
}

export interface IStatedModel extends Model, IStated {}
export type TStatedStatic = typeof Model & {
  new (value?: Record<string, unknown>, options?: BuildOptions): IStatedModel;
};
