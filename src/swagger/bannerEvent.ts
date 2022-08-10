import { responseCodeGeneral } from "../helper/responses";
import { getUpperCaseFirstMultipleLetter } from "../helper/utils";
import { resetExample } from "../helper/requests";

const prefix = "/bannerEvent";
const PREFIX_NAME = getUpperCaseFirstMultipleLetter(prefix.replace("/", ""));

const getDescriptionBannerEvent = (): string => {
    return `
     duong_dan*: 5 file| total_limit: 1mb| file_name:255 character
     su_kien_id*
    `;
};

const getPropertiesBannerEvent = (): { [key: string]: any } => {
    return {
        duong_dan: {
            type: "array",
            items: {
                type: "string",
                format: "binary",
            },
        },
        su_kien_id: {
            type: "number",
            example: 1,
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
                description: getDescriptionBannerEvent(),
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                ...getPropertiesBannerEvent(),
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
    //             description: getDescriptionBannerEvent().replace(
    //                 "duong_dan*",
    //                 "duong_dan"
    //             ),
    //             content: {
    //                 "multipart/form-data": {
    //                     schema: {
    //                         type: "object",
    //                         properties: {
    //                             ...getPropertiesBannerEvent(),
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
