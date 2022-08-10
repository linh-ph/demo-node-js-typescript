import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general"
export interface IBannerEvent extends ITimeStamp {
    duong_dan?: string;
    ten?: string;
    su_kien_id?: number;
}

export interface IBannerEventModel extends Model, IBannerEvent {}
export type TBannerEventStatic = typeof Model & {
    new (
        value?: Record<string, unknown>,
        options?: BuildOptions
    ): IBannerEventModel;
};
