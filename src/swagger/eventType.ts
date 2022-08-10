import { responseCodeGeneral } from "../helper/responses";
import { getUpperCaseFirstMultipleLetter } from "../helper/utils";
import { resetExample } from "../helper/requests";

const prefix = "/eventType";
const PREFIX_NAME = getUpperCaseFirstMultipleLetter(prefix.replace("/", ""));
export default {
    [`${prefix}/add`]: {
        post: {
            tags: [PREFIX_NAME],
            summary: `Tạo ${PREFIX_NAME}`,
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            parameters: [],
            requestBody: {
                description: `
         
          ten*
         
          `,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ten: {
                                    type: "string",
                                    required: true,
                                    example: "sự kiện 1",
                                },
                            },
                        },
                        ...resetExample,
                    },
                },
                required: true,
            },

            responses: responseCodeGeneral,
        },
    },
    [`${prefix}/update/{id}`]: {
        put: {
            tags: [PREFIX_NAME],
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            summary: `Sửa ${PREFIX_NAME}`,
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: `ID của ${PREFIX_NAME}`,
                    required: true,

                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
            ],
            requestBody: {
                description: `
            ten*
          `,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ten: {
                                    type: "string",
                                    example: "sự kiện 1",
                                    required: true,
                                },
                            },
                        },
                        ...resetExample,
                    },
                },
                required: true,
            },
            responses: responseCodeGeneral,
        },
    },
    [`${prefix}/delete/{id}`]: {
        delete: {
            tags: [`${PREFIX_NAME}`],
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            summary: `Xóa ${PREFIX_NAME}`,
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: `ID của ${PREFIX_NAME}`,
                    required: true,
                    // type: "integer",
                    // format: "int64",
                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
            ],

            responses: responseCodeGeneral,
        },
    },
    [`${prefix}/{id}`]: {
        get: {
            tags: [PREFIX_NAME],
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            summary: `Tìm ${PREFIX_NAME} qua Id`,
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: `ID của ${PREFIX_NAME}`,
                    required: true,
                    // type: "integer",
                    // format: "int64",
                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
            ],

            responses: responseCodeGeneral,
        },
    },
    [`${prefix}/`]: {
        get: {
            tags: [PREFIX_NAME],
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            summary: `Lấy all ${PREFIX_NAME}`,
            responses: responseCodeGeneral,
        },
    },
};
