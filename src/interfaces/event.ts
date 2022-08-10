import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IEvent extends ITimeStamp {
    ten?: string;
    so_luong?: number;
    ngay_bat_dau?: Date;
    ngay_ket_thuc?: Date;
    nha_to_chuc_id?: number;
    loai_su_kien_id?: number;
    tinh_chat_id?: number;
    tinh_trang_id?: number;
    thuoc_tinh_id?: number;
    thu_moi_id?: number;
    chu_de?: string;
    ma_qr?: string;
    link_qr?: string;
    da_du_noi_dung?: number;
}

export interface IEventModel extends Model, IEvent {}
export type TEventStatic = typeof Model & {
    new (value?: Record<string, unknown>, options?: BuildOptions): IEventModel;
};
