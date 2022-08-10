import {
  modelConfig,
  getRecordTimeStamp,
  strOfColumn,
  primaryKeyOfId,
  DEFINE_TABLE,
  bigIntForeignOfId,
} from "../config/modelConfig";
import { TTokenStatic } from "../interfaces/token";
import { Sequelize } from "sequelize";

export const TokenModel = (sequelize: Sequelize): TTokenStatic => {
  return <TTokenStatic>sequelize.define(
    DEFINE_TABLE.token,
    {
      id: { ...primaryKeyOfId },
      nguoi_tao_id: { ...bigIntForeignOfId },
      token: { ...strOfColumn },
      ...getRecordTimeStamp(),
    },
    modelConfig
  );
};
