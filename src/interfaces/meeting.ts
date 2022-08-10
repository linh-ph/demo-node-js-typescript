import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IMeeting extends ITimeStamp {
  ten?: string;
  ngay_bat_dau?: Date;
  ngay_ket_thuc?: Date;
  dia_diem_id?: number;
  chu_tri_id?: number;
  thuoc_tinh_id?: number;
  mo_ta?: string;
  file_noi_dung?: string;
}

export interface IMeetingModel extends Model, IMeeting {}
export type TMeetingStatic = typeof Model & {
  new (value?: Record<string, unknown>, options?: BuildOptions): IMeetingModel;
};
