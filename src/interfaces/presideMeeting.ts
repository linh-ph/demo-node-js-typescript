import { BuildOptions, Model } from "sequelize";
import { ITimeStamp } from "./general";
export interface IPresideMeeting extends ITimeStamp {
  cuoc_hop_id?: number;
  nguoi_dung_id?: number;
  trang_thai?: string;
}

export interface IPresideMeetingModel extends Model, IPresideMeeting {}
export type TPresideMeetingStatic = typeof Model & {
  new (
    value?: Record<string, unknown>,
    options?: BuildOptions
  ): IPresideMeetingModel;
};
