import {
  getRecordTimeStamp,
  strOfColumn,
  primaryKeyOfId,
  dateOfColumn,
  DEFINE_TABLE,
  bigIntForeignOfId,
  modelConfig,
} from "../config/modelConfig";
import { Sequelize } from "sequelize";
import { TStatedStatic } from "../interfaces/stated";

export const StatedModel = (sequelize: Sequelize): TStatedStatic => {
  return <TStatedStatic>sequelize.define(
    DEFINE_TABLE.stated,
    {
      id: { ...primaryKeyOfId },
      cuoc_hop_id: { ...bigIntForeignOfId },
      nguoi_dung_id: { ...bigIntForeignOfId },
      trang_thai: { ...strOfColumn },
      noi_dung: { ...strOfColumn },
      ...getRecordTimeStamp(),
    },
    modelConfig
  );
};
