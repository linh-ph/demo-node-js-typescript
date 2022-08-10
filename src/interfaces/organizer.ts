import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IOrganizer extends ITimeStamp {
  ten?: string;
}

export interface IOrganizerModel extends Model, IOrganizer {}

export type TOrganizerStatic = typeof Model & {
  new (
    value?: Record<string, unknown>,
    options?: BuildOptions
  ): IOrganizerModel;
};
