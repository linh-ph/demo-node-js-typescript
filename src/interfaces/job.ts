import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IJob extends ITimeStamp {
  id?: number;
  queue?: string;
  payload?: string;
  attempts?: string;
  reserved_at?: string;
  available_at?: string;
}

export interface IJobModel extends Model, IJob {}
export type TJobStatic = typeof Model & {
  new (value?: Record<string, unknown>, options?: BuildOptions): IJobModel;
};
