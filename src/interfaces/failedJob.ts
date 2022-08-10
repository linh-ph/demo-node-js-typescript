import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IFailedJob extends ITimeStamp {
  id?: number;
  connection?: string;
  queue?: string;
  payload?: string;
  exception?: string;
  failed_at?: string;
}

export interface IFailedJobModel extends Model, IFailedJob {}
export type TFailedJobStatic = typeof Model & {
  new (
    value?: Record<string, unknown>,
    options?: BuildOptions
  ): IFailedJobModel;
};
