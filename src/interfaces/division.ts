import { BuildOptions, Model } from "sequelize";
import { ITimeStamp } from "./general";
export interface IDivision extends ITimeStamp {
    ten?: string;
    ngay_tao?: Date;
}

export interface IDivisionModel extends Model, IDivision {}
export type TDivisionStatic = typeof Model & {
    new (
        value?: Record<string, unknown>,
        options?: BuildOptions
    ): IDivisionModel;
};
