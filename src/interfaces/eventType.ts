import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IEventType extends ITimeStamp {
  id?: number;
  ten?: string;
}

export interface IEventTypeModel extends Model, IEventType {}
export type TEventTypeStatic = typeof Model & {
  new (
    value?: Record<string, unknown>,
    options?: BuildOptions
  ): IEventTypeModel;
};
