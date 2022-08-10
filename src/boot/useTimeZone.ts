import moment from "moment";
import { Application, Request, Response } from "express";
import "moment-timezone";
// moment.tz.setDefault("Asia/Ho_Chi_Minh");
moment.tz.setDefault("UTC");
export const useTimeZone = (app: Application): void => {
    app.use("/timezone", (req: Request, res: Response) => {
        const timeZone = {
            "moment().utcOffset('+00:00').subtract(1, 'minute').subtract(12, 'hours').format('YYYY-MM-DD HH:mm:ss')":
                moment()
                    .utcOffset("+00:00")
                    .subtract(1, "minute")
                    .subtract(12, "hours")
                    .format("YYYY-MM-DD HH:mm:ss"),
            "moment().utcOffset('+00:00').subtract(1, 'minute').subtract(12, 'hours').toDate()":
                moment()
                    .utcOffset("+00:00")
                    .subtract(1, "minute")
                    .subtract(12, "hours")
                    .toDate(),
            "moment().subtract(1, 'minute').subtract(12, 'hours').format('YYYY-MM-DD HH:mm:ss')":
                moment()
                    .subtract(1, "minute")
                    .subtract(12, "hours")
                    .format("YYYY-MM-DD HH:mm:ss"),
            "moment().subtract(1, 'minute').subtract(12, 'hours').toDate()":
                moment().subtract(1, "minute").subtract(12, "hours").toDate(),
            "moment().format()": moment().format(),
            "moment().utcOffset('+00:00').format()": moment()
                .utcOffset("+00:00")
                .format(),
            "moment().format('YYYY-MM-DD HH:mm:ss')": moment().format(
                "YYYY-MM-DD HH:mm:ss"
            ),
            "moment().utcOffset('+00:00').format('YYYY-MM-DD HH:mm:ss')":
                moment().utcOffset("+00:00").format("YYYY-MM-DD HH:mm:ss"),
            "new Date": new Date(),
        };
        return res.send(`<pre style=
        "color:green; font-size: 20px; font-weight: bold;">${JSON.stringify(
            timeZone,
            null,
            4
        )}</pre>`);
    });
};
