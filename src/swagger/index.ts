import swaggerJSDoc from "swagger-jsdoc";
import users from "./users";
import auth, { LoginBody } from "./auth";
import group from "./group";
import event from "./event";
import eventType from "./eventType";
import nature from "./nature";
import properties from "./properties";
import utils from "./utils";
import bannerEvent from "./bannerEvent";
import organizer from "./organizer";
import status from "./status";
import file from "./file";
import schedule from "./schedule";
import division from "./division";
import meetingMember from "./meetingMember";
import meeting from "./meeting";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "HKG",
        description: "API HKG",
        version: "1.0.0",
    },

    servers: [
        {
            url: `http://${process.env.DOMAIN_NAME}/{basePath}`,
            description: `${process.env.NODE_ENV} server`,
            variables: {
                basePath: {
                    default: "v1",
                },
            },
        },
    ],

    produces: ["application/json"],
    schemes: ["http", "https"],
    paths: {
        ...meeting,
        ...meetingMember,
        ...division,
        ...schedule,
        ...file,
        ...status,
        ...organizer,
        ...bannerEvent,
        ...utils,
        ...properties,
        ...nature,
        ...eventType,
        ...event,
        ...group,
        ...users,
        ...auth,
    },

    components: {
        requestBodies: {
            LoginBody: LoginBody,
        },
        securitySchemes: {
            jwt: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
    },
};

const options = {
    swaggerDefinition,

    apis: ["../app.js"], // Các tệp chứa chú thích @swagger | Nếu dùng json thì không cần nhưng phải định nghĩa
};

const specs = swaggerJSDoc(options);
export default specs;
