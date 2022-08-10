import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";

export interface INature extends ITimeStamp {
  ten: string;
}

export interface INatureModel extends Model, INature {}
export type TNatureStatic = typeof Model & {
  new (value?: Record<string, unknown>, options?: BuildOptions): INatureModel;
};
