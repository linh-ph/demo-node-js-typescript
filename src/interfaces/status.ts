import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";

export interface IStatus extends ITimeStamp {
  ten: string;
}

export interface IStatusModel extends Model, IStatus {}
export type TStatusStatic = typeof Model & {
  new (value?: Record<string, unknown>, options?: BuildOptions): IStatusModel;
};
