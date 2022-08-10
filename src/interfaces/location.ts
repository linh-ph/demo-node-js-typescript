import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface ILocation extends ITimeStamp {
    ten?: string;
    quan_ly_id?: number;
    dia_chi?: string;
    sdt?: string;
    suc_chua?: number;
}

export interface ILocationModel extends Model, ILocation {}
export type TLocationStatic = typeof Model & {
    new (
        value?: Record<string, unknown>,
        options?: BuildOptions
    ): ILocationModel;
};
