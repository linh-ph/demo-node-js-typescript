/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITimeLineLog } from "../interfaces/general";
import winston from "winston";
import "winston-daily-rotate-file";
import { joinPathHelper, getDateTimeVi } from "./utils";

const transport = new winston.transports.DailyRotateFile({
    filename: joinPathHelper("../assets/logs/hkg_%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    json: true,
    maxSize: "50m",
    maxFiles: "365d",
});

const LEVELS: string[] = ["error", "info", "warning"];

const symsbolToString = (level: string | any): string => {
    const result: string | any = level;
    for (let index = 0; index < LEVELS.length; index++) {
        if (level.indexOf(LEVELS[index]) !== -1) {
            return LEVELS[index];
        }
    }
    return result;
};

export const logToString = (log: ITimeLineLog): string => {
    return `[${log.date}] [${log.level}] [${log.message}]`;
};

export const logger = winston.createLogger({
    // format của log được kết hợp thông qua format.combine
    format: winston.format.combine(
        winston.format.splat(),
        // Định dạng time cho log
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        // thêm màu sắc
        winston.format.colorize(),
        // thiết lập định dạng của log
        winston.format.printf((log) => {
            const createLineLog: ITimeLineLog = {
                date: getDateTimeVi(),
                level: symsbolToString(log.level),
                message:
                    typeof log.message === "object"
                        ? JSON.stringify(log.message)
                        : log.message,
            };

            return logToString(createLineLog);
        })
    ),
    transports: [
        // hiển thị log thông qua console
        new winston.transports.Console(),
        // Hiển thị log ra file theo daily
        transport,
    ],
});

export default class Logger {
    static onLoggerError = (log: any): void => {
        logger.error({ message: log });
    };

    static onLoggerInfo = (log: any): void => {
        logger.info({ message: log });
    };
}
