import { responseCodeGeneral } from "../helper/responses";
import { getUpperCaseFirstMultipleLetter } from "../helper/utils";
import { resetExample } from "../helper/requests";

const prefix = "/file";
const PREFIX_NAME = getUpperCaseFirstMultipleLetter(prefix.replace("/", ""));

const getDescription = (): string => {
    return `
     duong_dan*: 1 file| total_limit: 20mb| file_name:255 character
    `;
};

const getProperties = (): { [key: string]: any } => {
    return {
        duong_dan: {
            type: "array",
            items: {
                type: "string",
                format: "binary",
            },
        },
    };
};

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
                description: getDescription(),
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                ...getProperties(),
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
    // [`${prefix}/update/{id}`]: {
    //     put: {
    //         tags: [PREFIX_NAME],
    //         description: "",
    //         security: [
    //             {
    //                 jwt: [],
    //             },
    //         ],
    //         summary: `Sửa ${PREFIX_NAME}`,
    //         parameters: [
    //             {
    //                 name: "id",
    //                 in: "path",
    //                 description: `ID của ${PREFIX_NAME}`,
    //                 required: true,

    //                 schema: {
    //                     type: "integer",
    //                     format: "int64",
    //                 },
    //             },
    //         ],
    //         requestBody: {
    //             description: getDescription().replace(
    //                 "duong_dan*",
    //                 "duong_dan"
    //             ),
    //             content: {
    //                 "multipart/form-data": {
    //                     schema: {
    //                         type: "object",
    //                         properties: {
    //                             ...getProperties(),
    //                         },
    //                     },
    //                     ...resetExample,
    //                 },
    //             },
    //             required: true,
    //         },
    //         responses: responseCodeGeneral,
    //     },
    // },
    // [`${prefix}/delete/{id}`]: {
    //     delete: {
    //         tags: [`${PREFIX_NAME}`],
    //         description: "",
    //         security: [
    //             {
    //                 jwt: [],
    //             },
    //         ],
    //         summary: `Xóa ${PREFIX_NAME}`,
    //         parameters: [
    //             {
    //                 name: "id",
    //                 in: "path",
    //                 description: `ID của ${PREFIX_NAME}`,
    //                 required: true,
    //                 // type: "integer",
    //                 // format: "int64",
    //                 schema: {
    //                     type: "integer",
    //                     format: "int64",
    //                 },
    //             },
    //         ],

    //         responses: responseCodeGeneral,
    //     },
    // },
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
