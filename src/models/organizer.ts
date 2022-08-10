import {
  modelConfig,
  getRecordTimeStamp,
  strOfColumn,
  primaryKeyOfId,
  DEFINE_TABLE,
} from "../config/modelConfig";
import { TOrganizerStatic } from "../interfaces/organizer";
import { Sequelize } from "sequelize";

export const OrganizerModel = (sequelize: Sequelize): TOrganizerStatic => {
  return <TOrganizerStatic>sequelize.define(
    DEFINE_TABLE.organizer,
    {
      id: { ...primaryKeyOfId },
      ten: { ...strOfColumn },
      ...getRecordTimeStamp(),
    },
    modelConfig
  );
};
