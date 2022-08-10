import {
  modelConfig,
  getRecordTimeStamp,
  strOfColumn,
  primaryKeyOfId,
  DEFINE_TABLE,
  bigIntForeignOfId,
} from "../config/modelConfig";
import { TPropertiesStatic } from "../interfaces/properties";
import { Sequelize } from "sequelize";

export const PropertiesModel = (sequelize: Sequelize): TPropertiesStatic => {
  return <TPropertiesStatic>sequelize.define(
    DEFINE_TABLE.properties,
    {
      id: { ...primaryKeyOfId },
      ten: { ...strOfColumn },
      ...getRecordTimeStamp(),
    },
    modelConfig
  );
};
