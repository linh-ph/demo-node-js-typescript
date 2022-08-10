import {
  modelConfig,
  getRecordTimeStamp,
  strOfColumn,
  primaryKeyOfId,
  DEFINE_TABLE,
  bigIntForeignOfId,
} from "../config/modelConfig";
import { TPresideMeetingStatic } from "../interfaces/presideMeeting";
import { Sequelize } from "sequelize";

export const PresideModel = (sequelize: Sequelize): TPresideMeetingStatic => {
  return <TPresideMeetingStatic>sequelize.define(
    DEFINE_TABLE.presideMeeting,
    {
      id: { ...primaryKeyOfId },
      cuoc_hop_id: { ...bigIntForeignOfId },
      nguoi_dung_id: { ...bigIntForeignOfId },
      trang_thai: { ...strOfColumn },
      ...getRecordTimeStamp(),
    },
    modelConfig
  );
};
