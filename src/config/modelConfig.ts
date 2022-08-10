/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Op } from "sequelize";
import {
    changeTimezoneOffsetVi,
    getTimeStamp,
    changeTimezoneOffsetToZero,
    castToUriServer,
} from "../helper/utils";
const OFFSET_INDEX_DEFAULT = 1;

export enum DEFINE_TABLE {
    user = "nguoi_dung",
    group = "nhom",
    token = "token",
    organizer = "nha_to_chuc",
    event = "su_kien",
    bannerEvent = "anh_bia_su_kien",
    presideMeeting = "chu_tri_cuoc_hop",
    meeting = "cuoc_hop",
    location = "dia_diem",
    failedJob = "failedJob",
    files = "files",
    documentNotes = "ghi_chu_tai_lieu",
    jobs = "jobs",
    schedule = "lich_trinh",
    eventType = "loai_su_kien",
    stated = "phat_bieu",
    documentApproval = "phe_duyet_tai_lieu",
    document = "tai_lieu",
    meetingDocument = "tai_lieu_cuoc_hop",
    meetingMember = "thanh_vien_cuoc_hop",
    properties = "thuoc_tinh",
    nature = "tinh_chat",
    status = "tinh_trang",
    role = "vai_tro",
    division = "phan_ban",
}

export const modelConfig: any = {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    scopes: {
        notDeleted: {
            where: {
                deleted_at: null,
            },
        },
        findIdDeleted: function (id: number) {
            return {
                where: {
                    id: id,
                    [Op.not]: [
                        {
                            deleted_at: null as any,
                        },
                    ],
                },
            };
        },
        findById: function (id: number) {
            return {
                where: {
                    id: id,
                    deleted_at: null as any,
                },
            };
        },
        findByTypeId: function (fieldId: string, typeId: number) {
            return {
                where: {
                    [fieldId]: typeId,
                },
            };
        },
        findByColumn: function (fieldName: string, value: string) {
            return { where: { [fieldName]: value, deleted_at: null as any } };
        },
        update: function (id: number) {
            return {
                where: {
                    id: id,
                    deleted_at: null as any,
                },
            };
        },
        getPaging: function (page: number, limit: number) {
            const start = (page - OFFSET_INDEX_DEFAULT) * limit;
            return { offset: start, limit: limit };
        },
    },
};

export const createGetterSetterDate = (
    columnName: string
): { [key: string]: any } => {
    return {
        set(value: Date): void {
            if (!value) {
                return null;
            }

            this.setDataValue(columnName, changeTimezoneOffsetVi(value));
        },
        get(): Date {
            return changeTimezoneOffsetVi(this.getDataValue(columnName));
        },
    };
};

export const createGetterDate = (
    columnName: string
): { [key: string]: any } => {
    return {
        get(): Date {
            if (!this.getDataValue(columnName)) {
                return null;
            }
            return changeTimezoneOffsetVi(this.getDataValue(columnName));
        },
    };
};

export const getRecordTimeStamp = (): { [key: string]: unknown } => {
    return {
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            ...createGetterSetterDate("created_at"),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            ...createGetterDate("updated_at"),
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            ...createGetterDate("deleted_at"),
        },
    };
};

export const primaryKeyOfId = {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
};

export const bigIntForeignOfId: any = {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
};

export const strOfColumn = {
    type: DataTypes.STRING,
    allowNull: true,
};

export const strOfPathColumn = (columnName: string): any => {
    return {
        type: DataTypes.STRING,
        allowNull: true,
        get(): string {
            if (!this.getDataValue(columnName)) {
                return null;
            }
            return castToUriServer(this.getDataValue(columnName));
        },
    };
};

export const strOfPasswordColumn = {
    type: DataTypes.STRING,
    allowNull: true,
    set(value: string): void {
        this.setDataValue("mat_khau", value);
    },
};

export const strOfColumnQRCode = {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: (): string => {
        return getTimeStamp().toString();
    },
};

export const strOfColumnLinkCode = {
    type: DataTypes.STRING,
    allowNull: true,
};

export const intOfColumn = {
    type: DataTypes.INTEGER,
    allowNull: true,
};

export const intTinyColumn = {
    type: DataTypes.TINYINT,
    allowNull: true,
};

export const dateOfColumn = {
    type: DataTypes.DATE,
    allowNull: true,
};

export const textOfColumn = {
    type: DataTypes.TEXT,
    allowNull: true,
};

export const timeOfColumn = {
    type: DataTypes.TIME,
    allowNull: true,
};

export const dateOfColumnCastTimeZone = (columnName: string): any => {
    return {
        type: DataTypes.DATE,
        allowNull: true,
        ...createGetterSetterDate(columnName),
    };
};

export const dateOfColumnCastTimeZoneDefault = (columnName: string): any => {
    return {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        set(value: Date): void {
            if (!value) {
                return null;
            }
            this.setDataValue(columnName, changeTimezoneOffsetToZero(value));
        },
        get(): Date {
            return new Date(this.getDataValue(columnName));
        },
    };
};

export const defaultQueryOption: { [key: string]: boolean } = {
    raw: false,
    nest: true,
};

export const orderDateDesc: { [key: string]: any } = {
    order: [["created_at", "desc"]],
};

export const orderStringColumn = (
    columnName?: string,
    sort?: string
): { [key: string]: any } => {
    return {
        order: [[columnName, sort ?? "asc"]],
    };
};

export const createForeignByTableName = (
    aliasTableName: string,
    fieldForeignID: string
): { [key: string]: any } => {
    return {
        as: aliasTableName,
        foreignKey: {
            allowNull: true,
            name: fieldForeignID,
        },
        constraints: false,
    };
};
