import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";

export interface IMeetingMember extends ITimeStamp {
    cuoc_hop_id?: number;
    nguoi_dung_id?: number;
    vi_tri?: string;
    trang_thai?: string;
    ghi_chu?: string;
    chu_tri?: number;
}

export interface IMeetingMemberModel extends Model, IMeetingMember {}
export type TMeetingMemberStatic = typeof Model & {
    new (
        value?: Record<string, unknown>,
        options?: BuildOptions
    ): IMeetingMemberModel;
};
