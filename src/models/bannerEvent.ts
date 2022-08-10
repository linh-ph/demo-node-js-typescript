import {
    modelConfig,
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    strOfPathColumn,
} from "../config/modelConfig";
import { TBannerEventStatic } from "../interfaces/bannerEvent";
import { Sequelize } from "sequelize";

export const BannerEventModel = (sequelize: Sequelize): TBannerEventStatic => {
    return <TBannerEventStatic>sequelize.define(
        DEFINE_TABLE.bannerEvent,
        {
            id: { ...primaryKeyOfId },
            duong_dan: { ...strOfPathColumn("duong_dan") },
            ten: { ...strOfColumn },
            su_kien_id: { ...bigIntForeignOfId },
            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
