import express, { Application } from "express";
import specs from "../swagger";
import database from "./useDatabase";
import { setContainerDependencyInject } from "./useDependencyInject";
import { setAssociation } from "./useAssociation";
import { useController } from "./useExpressServer";
import cors from "cors";
import { useTimeZone } from "./useTimeZone";
import { useStatic } from "./useStatic";
import { useTest } from "./useTest";

//___________
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerUi = require("swagger-ui-express");

// Config express
const app: Application = express();

// Configs baseName (This is CORS-enabled for all origins!)
app.use(cors());

// Config database
setAssociation(database);

// Đồng bộ không làm gì
database.sequelize.sync();

// Chỉ edit
database.sequelize.sync({ alter: true, force: false });

// Init inject typeid
setContainerDependencyInject(database);

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

// Config Router to express
useController(app);

// check static timezone
useTimeZone(app);

// test API
useTest(app);

// Init static folder
useStatic(app);

app.use("/v1/documentation", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
