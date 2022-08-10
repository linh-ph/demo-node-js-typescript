import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IRole extends ITimeStamp {
  ten_vai_tro: string;
  ngay_tao: Date;
  nguoi_tao_id: Date;
}

export interface IRoleModel extends Model, IRole {}
export type TRoleStatic = typeof Model & {
  new (value?: Record<string, unknown>, options?: BuildOptions): IRoleModel;
};
