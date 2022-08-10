import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface ISchedule extends ITimeStamp {
    phan_ban_id?: number;
    tieu_de?: string;
    dien_gia_id?: number;
    cuoc_hop_id?: number;
    ngay_dien_ra?: Date;
    gio_bat_dau?: Date;
    gio_ket_thuc?: Date;
    mo_ta?: string;
}

export interface IScheduleModel extends Model, ISchedule {}
export type TScheduleStatic = typeof Model & {
    new (
        value?: Record<string, unknown>,
        options?: BuildOptions
    ): IScheduleModel;
};
