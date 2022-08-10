import { BuildOptions, Model } from "sequelize";
import { ITimeStamp } from "./general";
export interface IGroup extends ITimeStamp {
  nguoi_tao_id?: number;
  ten?: string;
  ngay_tao?: Date;
}

export interface IGroupModel extends Model, IGroup {}
export type TGroupStatic = typeof Model & {
  new (value?: Record<string, unknown>, options?: BuildOptions): IGroupModel;
};
