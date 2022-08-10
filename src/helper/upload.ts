/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import multer from "multer";
import { joinPathHelper, getDateTimeVi } from "./utils";
import MESSAGE_RESPONSE from "../constraints";

const NUM_FILE_ALLOW = 5;
const FOLDER_SAVE = "./../assets/uploads";
export const FILTER_EXTENSION = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/bmp",
];
const MEGABYTES = 5;

const NUM_FILE_ALLOW_FILE = 1;
const FOLDER_SAVE_FILE = "./../assets/file";
const MEGABYTES_FILE = 20;

export const FILTER_EXTENSION_FILE_OFFICE = [
    {
        id: 1,
        name: "pdf",
        extension: "application/pdf",
    },
    {
        id: 2,
        name: "csv",
        extension: "text/csv",
    },
    {
        id: 3,
        name: "xls",
        extension: "application/vnd.ms-excel",
    },
    {
        id: 4,
        name: "xlsx",
        extension:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    {
        id: 5,
        name: "doc",
        extension: "application/msword",
    },
    {
        id: 6,
        name: "docx",
        extension:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    {
        id: 7,
        name: "ppt",
        extension: "application/vnd.ms-powerpoint",
    },
    {
        id: 8,
        name: "pptx",
        extension:
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
    {
        id: 9,
        name: "pptx",
        extension:
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
];

export const FILTER_EXTENSION_FILE = [
    {
        id: 1,
        name: "pdf",
        extension: "application/pdf",
    },
    {
        id: 2,
        name: "doc",
        extension: "application/msword",
    },
    {
        id: 3,
        name: "docx",
        extension:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
];

export const fileUploadOptions = {
    storage: multer.diskStorage({
        destination: function (req: Request, file: Express.Multer.File, cb) {
            cb(null, joinPathHelper(FOLDER_SAVE));
        },
        filename: function (req: Request, file: Express.Multer.File, cb) {
            cb(null, `hkg-${getDateTimeVi()}-${file.originalname}`);
        },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb: any): void => {
        if (FILTER_EXTENSION.indexOf(file.mimetype) === -1) {
            cb(
                new Error(
                    MESSAGE_RESPONSE.inValidExtension +
                        FILTER_EXTENSION.map((item) =>
                            item.replace("image/", "")
                        ).join(",")
                )
            );
        }

        cb(null, true);
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * MEGABYTES,
        files: NUM_FILE_ALLOW,
    },
};

export const fileUploadOfficeOptions = {
    storage: multer.diskStorage({
        destination: function (req: Request, file: Express.Multer.File, cb) {
            cb(null, joinPathHelper(FOLDER_SAVE_FILE));
        },
        filename: function (req: Request, file: Express.Multer.File, cb) {
            cb(null, `hkg-${getDateTimeVi()}-${file.originalname}`);
        },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb: any): void => {
        for (let index = 0; index < FILTER_EXTENSION_FILE.length; index++) {
            const value = FILTER_EXTENSION_FILE[index].extension;

            if (value.indexOf(file.mimetype) !== -1) {
                return cb(null, true);
            }
        }
        return cb(
            new Error(
                MESSAGE_RESPONSE.inValidExtension +
                    FILTER_EXTENSION_FILE.map((item) => item.name).join(",")
            )
        );
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * MEGABYTES_FILE,
        files: NUM_FILE_ALLOW_FILE,
    },
};
