import { BuildOptions, Model } from "sequelize";

import { ITimeStamp } from "./general";
export interface IFile extends ITimeStamp {
    ten?: string;
    loai?: string;
    dung_luong?: string;
    duong_dan?: string;
}

export interface IFileModel extends Model, IFile {}
export type TFileStatic = typeof Model & {
    new (value?: Record<string, unknown>, options?: BuildOptions): IFileModel;
};
