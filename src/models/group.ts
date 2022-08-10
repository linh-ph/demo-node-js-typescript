import {
    getRecordTimeStamp,
    strOfColumn,
    primaryKeyOfId,
    DEFINE_TABLE,
    bigIntForeignOfId,
    modelConfig,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TGroupStatic } from "../interfaces/group";

export const GroupModel = (sequelize: Sequelize): TGroupStatic => {
    return <TGroupStatic>sequelize.define(
        DEFINE_TABLE.group,
        {
            id: { ...primaryKeyOfId },
            nguoi_tao_id: { ...bigIntForeignOfId },
            ten: { ...strOfColumn },

            ...getRecordTimeStamp(),
        },
        modelConfig
    );
};
