import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";

export interface IProperties extends ITimeStamp {
  ten: string;
}

export interface IPropertiesModel extends Model, IProperties {}
export type TPropertiesStatic = typeof Model & {
  new (
    value?: Record<string, unknown>,
    options?: BuildOptions
  ): IPropertiesModel;
};
