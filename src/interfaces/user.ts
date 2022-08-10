/* eslint-disable @typescript-eslint/no-explicit-any */
import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IUser extends ITimeStamp {
    ten?: string;
    email?: string;
    chuc_vu?: string;
    phan_quyen?: string;
    mat_khau?: string;
    remember_token?: string;

    sdt?: string;
    gioi_tinh?: string;
    nhom_id?: number;
    ngay_tham_gia?: Date;
    kich_hoat?: number;
    don_vi?: string;
    anh_dai_dien?: string;
    file_chu_ky?: string;
    chu_ky_sms?: number;
    chu_ky_email?: number;

    [key: string]: any;
}

export interface IUserSearch {
    ten?: string;
    email?: string;
    sdt?: string;
}

export interface IUserModel extends Model, IUser {}

export type TUserStatic = typeof Model & {
    new (value?: Record<string, unknown>, options?: BuildOptions): IUserModel;
};

export interface IDecodeToken {
    success?: boolean;
    decoded?: IUser;
    error?: string;
}

export type IUserPromise = Promise<IUser | null>;
export type IBooleanPromise = Promise<boolean | null>;

export interface IInputValidate {
    ten?: string;
    so_luong?: number;
    ngay_bat_dau?: Date;
    ngay_ket_thuc?: Date;
    loai_su_kien_id?: number;
    tinh_chat_id?: number;
    tinh_trang_id?: number;
    thuoc_tinh_id?: number;
    chu_de?: string;
    thu_moi_id?: number;
    ma_qr?: string;
    da_du_noi_dung?: number;
    nha_to_chuc_id?: number;
}

export interface ISearchGeneral {
    [key: string]: any;
}

export interface IUserDecodeFromToken {
    id: number;
    phan_quyen: string;
    iat: number;
    exp: number;
}

export interface IUserRes {
    id?: number;
    phan_quyen?: string;
}
