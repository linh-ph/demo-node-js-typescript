/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { Response } from "express";
import { AddUserDto } from "../dto/userDto";
import {
    IUser,
    ISearchGeneral,
    IUserDecodeFromToken,
    IUserRes,
} from "../interfaces/user";
import { Op } from "sequelize";
import { SearchAttributeDto } from "../dto/generalDto";
const INDEX_IMPACT = 0;
const SALT_ROUNDS = 10;
const PAGE_CURRENT = 0;
const INCREASE_CURRENT = 1;
const OFFSET_INDEX_DEFAULT = 1;
const KEY_REMOVE_PASSWORD = "mat_khau";

export const onSuccess = (
    data?: unknown,
    message?: string,
    status?: number
): { [key: string]: unknown } => {
    if (!data) {
        return {
            message: message as string | "Thành công",
            status: status || 200,
        };
    }

    return {
        message: message as string | "Thành công",
        status: status || 200,
        data: data,
    };
};

export function createPrefixToken(jwtToken: string): string {
    return `Bearer ${jwtToken}`;
}

export function sendResponseHeader(res: Response, bearer: string): void {
    res.header("Authorization", bearer);
}

export async function getPasswordHashByBcrypt(
    password: string
): Promise<string | null> {
    return await bcrypt.hashSync(password, SALT_ROUNDS);
}

export async function isCompareValidPasswordByBcrypt(
    userPasswordHash: string,
    reqUserPassword: string
): Promise<boolean> {
    return await bcrypt.compare(reqUserPassword, userPasswordHash);
}

export function isImpactZeroColumn(result: number[]): boolean {
    return result && result?.includes(INDEX_IMPACT);
}

export function isImpactColumn(result: number[]): boolean {
    if (isImpactZeroColumn(result)) {
        return false;
    }
    return result.length > 0;
}

export const getIdAndRoleUser = (user: IUser): IUserRes => {
    return {
        id: user.id,
        phan_quyen: user.phan_quyen,
    };
};

export async function addPasswordHashToUser(
    dto: AddUserDto
): Promise<IUser | null> {
    try {
        if (!dto.mat_khau) {
            return null;
        }
        const hashPassword = await getPasswordHashByBcrypt(dto.mat_khau);

        const user: IUser = {
            ...dto,
            mat_khau: hashPassword,
        };
        return user;
    } catch (error) {
        console.log("%cindex.ts line:76 error", "color: #007acc;", error);
        return null;
    }
}

export const createResponsePaging = (
    page: number,
    limit: number,
    data: { [key: string]: any },
    count: number
): { [key: string]: any } => {
    const number_page =
        Math.floor(count / limit) +
        (count % limit == PAGE_CURRENT ? PAGE_CURRENT : INCREASE_CURRENT);

    return {
        content: data,
        total_records: count,
        total_pages: number_page,
        page: page,
        has_next: page >= number_page ? false : true,
        has_prev: page > 1 ? true : false,
    };
};

export const createResponseList = (data: {
    [key: string]: any;
}): { [key: string]: any } => {
    return {
        content: data,
    };
};

export const getPaging = (
    page: number,
    limit: number
): { [key: string]: number } => {
    const start = (page - OFFSET_INDEX_DEFAULT) * limit;
    return { offset: start, limit: limit };
};

export const isObjectsHasProperties = (conditionSearch: {
    [key: string]: unknown;
}): boolean => Object.keys(conditionSearch).length > 0;

export const createOpLikeByValue = (
    value: string | number
): { [key: string]: unknown } => {
    return { [Op.like]: `%${value}%` };
};

export const connectConditionOr = (
    conditionSearch: Record<string, unknown>
): { [key: string]: unknown } | null => {
    return isObjectsHasProperties(conditionSearch)
        ? {
              [Op.or]: conditionSearch,
          }
        : null;
};

export const connectConditionAnd = (
    conditionSearch: Record<string, unknown>
): { [key: string]: unknown } | null => {
    return isObjectsHasProperties(conditionSearch)
        ? {
              [Op.and]: conditionSearch,
          }
        : null;
};

export const LIST_SEARCH_ATTRIBUTE: string[] = ["ten", "email", "sdt"];

export const createConditionSearch = (
    dto: any | { [key: string]: any }
): { [key: string]: any } => {
    const conditionSearch: Record<string, unknown> = {};
    if (dto?.ten) {
        conditionSearch["ten"] = createOpLikeByValue(dto.ten);
    }
    if (dto?.email) {
        conditionSearch["email"] = createOpLikeByValue(dto.email);
    }
    if (dto?.sdt) {
        conditionSearch["sdt"] = createOpLikeByValue(dto.sdt);
    }

    return connectConditionAnd(conditionSearch);
};

export const createConditionSearchGroup = (
    dto: SearchAttributeDto | { [key: string]: any }
): { [key: string]: any } => {
    const conditionSearch: Record<string, unknown> = {};
    if (dto?.ten_nhom) {
        conditionSearch["ten"] = createOpLikeByValue(dto.ten_nhom);
    }

    return connectConditionAnd(conditionSearch);
};

export const createConditionSearchGeneral = (
    dto: ISearchGeneral,
    listSearch: Array<string>
): { [key: string]: any } => {
    const rest: ISearchGeneral = {};
    listSearch.map((item: string) => {
        if (item in dto) {
            rest[item] = dto[item as any];
        }
    });

    const conditionSearch: ISearchGeneral = {};
    Object.keys(rest).map((item: string) => {
        if (item in rest) {
            conditionSearch[item] = { [Op.like]: `%${dto[item]}%` };
        }
    });

    return connectConditionAnd(conditionSearch);
};

export const isValidUpdate = (result: [number, Array<any>]): boolean | null => {
    if (result?.includes(INDEX_IMPACT)) {
        return null;
    }
    return result.length > 0;
};

export const removePropertiesPassword = (user: [number, Array<any>]): any => {
    const { [KEY_REMOVE_PASSWORD]: __, ...rest } = user as any;
    return rest;
};

const isHasOwnProperties = (obj: Record<string, unknown>): boolean => {
    return typeof obj === "object" && "rows" in obj && "count" in obj;
};

export const modelToRaw = (model: any): any => {
    if (!model) {
        return null;
    }

    if (Array.isArray(model)) {
        return JSON.parse(JSON.stringify(model));
    }

    if (isHasOwnProperties(model as Record<string, unknown>)) {
        return {
            count: model.count,
            rows: JSON.parse(JSON.stringify(model.rows)),
        };
    }

    return model.get({
        plain: true,
    });
};

export const getAssociationGroup = (): { [key: string]: unknown } => {
    return {
        as: "groupDetail",
        association: "group",
        attributes: ["id", "ten"],
    };
};

export const getAssociationEventType = (): { [key: string]: unknown } => {
    return {
        as: "eventTypeDetail",
        association: "event_type",
        attributes: ["id", "ten"],
    };
};

export const getAssociationNature = (): { [key: string]: unknown } => {
    return {
        as: "natureDetail",
        association: "nature",
        attributes: ["id", "ten"],
    };
};

export const getAssociationProperties = (): { [key: string]: unknown } => {
    return {
        as: "propertiesDetail",
        association: "properties",
        attributes: ["id", "ten"],
    };
};

export const getAssociationBannerEvent = (): { [key: string]: unknown } => {
    return {
        as: "bannerEventDetail",
        association: "event_banner_event",
        attributes: ["id", "su_kien_id", "ten", "duong_dan", "created_at"],
    };
};

export const getAssociationOrganizer = (): { [key: string]: unknown } => {
    return {
        as: "organizerDetail",
        association: "organizer",
        attributes: ["id", "ten"],
    };
};

export const getAssociationStatus = (): { [key: string]: unknown } => {
    return {
        as: "statusDetail",
        association: "status",
        attributes: ["id", "ten"],
    };
};

export const getAssociationFile = (): { [key: string]: unknown } => {
    return {
        as: "eventDetail",
        association: "event",
        attributes: [
            "id",
            "ten",
            "duong_dan",
            "loai",
            "dung_luong",
            "created_at",
        ],
    };
};

export const getAssociationDivision = (): { [key: string]: unknown } => {
    return {
        as: "divisionDetail",
        association: "division",
        attributes: ["id", "ten"],
    };
};

export const getAssociationMeetingMember = (): { [key: string]: unknown } => {
    return {
        as: "meetingMemberDetail",
        association: "meeting_member",
        attributes: [
            "id",
            "vi_tri",
            // "trang_thai",
            // "ghi_chu",
            // "cuoc_hop_id",
            // "nguoi_dung_id",
        ],
    };
};
