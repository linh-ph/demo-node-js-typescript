import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IToken extends ITimeStamp {
    nguoi_tao_id?: number;
    token?: string;
}
export interface ITokenModel extends Model, IToken {}

export type TTokenStatic = typeof Model & {
    new (value?: Record<string, unknown>, options?: BuildOptions): ITokenModel;
};
