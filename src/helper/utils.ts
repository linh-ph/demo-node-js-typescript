/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import Settings from "../config";
import { IFile } from "interfaces";
import { FILTER_EXTENSION_FILE } from "./upload";
import { IResTryCatch } from "interfaces/general";

const DEFAULT_OFFSET_ZERO = 0;
const DEFAULT_OFFSET_VIET_NAM = 420;

const PREFIX_PATH_IMAGE = "../assets/image";
const PREFIX_PATH_FILE = "../assets/file";
const START_MONTH = 1;
const FOLDER_ASSET_UPLOAD = "/assets/file";

export function addZeroText(text: number): string {
    return text <= 9 ? "0" + text : text + "";
}

export const getDay = (date: Date, numDay?: number): number => {
    return numDay ? date.getDate() + numDay : date.getDate();
};

export const getDayCurrent = (date: Date): number => {
    return date.getDate();
};

export function dateToYMD(numDay?: number, isCurrent?: boolean): string {
    const date = changeTimezoneOffsetToZero(new Date());
    let day = 0;
    if (isCurrent) {
        day = getDayCurrent(date);
    } else {
        day = getDay(date, numDay);
    }
    const month = date.getMonth() + START_MONTH; //Month from 0 to 11
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const fullHHmmss = `${addZeroText(hours)}:${addZeroText(
        minutes
    )}:${addZeroText(seconds)}`;
    return (
        "" +
        year +
        "-" +
        (month <= 9 ? "0" + month : month) +
        "-" +
        (day <= 9 ? "0" + day : day) +
        " " +
        fullHHmmss
    );
}

export function dateToHm(numDay?: number, isCurrent?: boolean): string {
    const date = changeTimezoneOffsetToZero(new Date());
    let day = 0;
    if (isCurrent) {
        day = getDayCurrent(date);
    } else {
        day = getDay(date, numDay);
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const fullHHmm = `${addZeroText(hours)}:${addZeroText(minutes)}`;
    return fullHHmm;
}

export function getMomentFormat(
    dataInstance: Date | string,
    offset: number
): string {
    return (
        moment(dataInstance)
            .utc()
            .utcOffset(offset)
            .format("YYYY-MM-DD[T]HH:mm:ss.000") + "Z"
    );
}

export function changeTimezoneOffsetToZero(dataInstance: Date | string): Date {
    if (!dataInstance) {
        return null;
    }
    const dateMoment = getMomentFormat(dataInstance, DEFAULT_OFFSET_ZERO);
    // Moment convert sang Date
    return new Date(dateMoment);
}

export function changeTimezoneOffsetVi(dataInstance: Date | string): Date {
    if (!dataInstance) {
        return null;
    }

    const dateMoment = getMomentFormat(dataInstance, DEFAULT_OFFSET_VIET_NAM);
    return new Date(dateMoment);
}

export function getDateTime(): string | Date {
    return (
        moment()
            .utc()
            .utcOffset(DEFAULT_OFFSET_ZERO)
            .format("YYYY-MM-DD[T]HH:mm:ss.000") + "Z"
    );
}

export function getDateTimeYearMonthDay(): string | Date {
    return moment().format("YYYY-MM-DD");
}

export function getUpperCaseFirstLetter(str: string): string {
    return str.toLowerCase().replace(/\b[a-z]/g, (letter) => {
        return letter.toUpperCase();
    });
}

export function getUpperCaseFirstMultipleLetter(str: string): string {
    return str.replace(/\b[a-z]/g, (letter) => {
        return letter.toUpperCase();
    });
}

export const getTimeStamp = (): number => {
    return moment().utc().utcOffset(DEFAULT_OFFSET_ZERO).unix();
};

export const getDateTimeVi = (): string | Date => {
    return (
        moment()
            .utc()
            .utcOffset(DEFAULT_OFFSET_VIET_NAM)
            .format("YYYY-MM-DD[T]HH:mm:ss.000") + "Z"
    );
};

export function getNumberRandom(start: number, end: number): number {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

// !deprecate, do not use future
export const getUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const joinPathHelper = (folder: string): string => {
    const absolutePath = path.join(__dirname, folder);
    checkDirNotExistThenCreate(absolutePath);
    return absolutePath;
};

export const checkDirNotExistThenCreate = (folder: string): boolean => {
    try {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const searchExtension = (extension: string): string => {
    for (let index = 0; index < FILTER_EXTENSION_FILE.length; index++) {
        const value = FILTER_EXTENSION_FILE[index].extension;

        if (value.indexOf(extension) !== -1) {
            return FILTER_EXTENSION_FILE[index].name;
        }
    }
    return null;
};

export const getLastStr = (str: string, character = "." as string) => {
    return str.split(character).pop();
};

export const getInfoFile = (file: string): IResTryCatch<IFile> => {
    try {
        file =
            "hkg-2021-06-15T18:15:26.000Z-Webtietkiem.com-Day-con-lam-giau-tap-1-2-3-4-5.pdf";
        const extension = getLastStr(file, ".");
        const rest = file.substring(0, file.lastIndexOf(".") + 1);
        const typeExtensition = searchExtension(extension);
        if (!typeExtensition) {
            throw new Error("Không tìm thấy extension");
        }

        const createInfoFile: IFile = {
            ten: rest,
            duong_dan: FOLDER_ASSET_UPLOAD + "/" + file,
            loai: typeExtensition,
            // dung_luong: file.size.toString(),
        };
        return {
            message: "decode thành công",
            success: false,
            data: createInfoFile,
        };
    } catch (error: any) {
        return { message: error.message, success: true };
    }
};

export const castToUriServer = (path: string): string => {
    return Settings.internetProtocol + process.env.DOMAIN_NAME + path;
};

export const textToQRCodeUrl = async (text: string): Promise<string | null> => {
    try {
        if (!text) {
            return null;
        }

        const uriQRCode = await QRCode.toDataURL(text);
        if (!uriQRCode) {
            return null;
        }

        const folder = `${joinPathHelper(PREFIX_PATH_IMAGE)}`;
        const fileName = `hkg_${getTimeStamp()}.png`;
        const pathSaveImage = `${folder}/${fileName}`;

        fs.writeFile(
            pathSaveImage,
            uriQRCode.replace(/^data:image\/png;base64,/, ""),
            "base64",
            function (err: any) {
                console.log("%cutils.ts line:167 err", "color: #007acc;", err);
            }
        );

        return PREFIX_PATH_IMAGE.replace("..", "") + "/" + fileName;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const isDateBigger = (date: Date, currentDate: Date): boolean => {
    return date.getTime() > currentDate.getTime();
};

export const isDateGreaterThanCurrent = (textDate: string): boolean => {
    // Time zone nhập vào là giờ bên viet name nên khi change offset 0 là là chính nó
    const formatDate = changeTimezoneOffsetToZero(textDate);
    // Time zone new Date là time zone +0 khi change về bên viet name thì là +7
    const currentDate = changeTimezoneOffsetVi(new Date());
    return isDateBigger(formatDate, currentDate);
};

export const createAbsolutePath = (
    prefixPath: string,
    extension: string
): string => {
    const folder = `${joinPathHelper(prefixPath)}`;
    const fileName = `hkg_${getTimeStamp()}.${extension}`;
    if (!checkDirNotExistThenCreate(folder)) {
        return null;
    }
    const pathSave = `${folder}/${fileName}`;
    return pathSave;
};

export const readFile = async (path: any): Promise<void | null> => {
    fs.readFile(path, async function (err, data) {
        await saveFile(createAbsolutePath(PREFIX_PATH_FILE, "pdf"), data);
    });
};

export const saveFile = async (
    pathSave: any,
    body: any
): Promise<void | null> => {
    const result = await fs.writeFileSync(pathSave, body, "binary");
};
