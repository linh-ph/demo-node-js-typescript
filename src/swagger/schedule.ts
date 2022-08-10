import { responseCodeGeneral } from "../helper/responses";
import { getUpperCaseFirstLetter, dateToYMD, dateToHm } from "../helper/utils";
import { resetExample } from "../helper/requests";
import { getPropertiesPaging } from "./general";
const prefix = "/schedule";
const PREFIX_NAME = getUpperCaseFirstLetter(prefix.replace("/", ""));

const getDescription = (): string => {
    return `
    phan_ban_id: 
    tieu_de: 
    dien_gia: 
    cuoc_hop_id: 
    ngay_dien_ra: Now < 2021-05-20 16:37:29(YYYY-MM-DD HH-mm-ss)
    gio_bat_dau: HH:mm
    gio_ket_thuc: HH:mm
    mo_ta: string
    `;
};

const getProperties = (): { [key: string]: any } => {
    return {
        phan_ban_id: {
            type: "number",
            required: false,
            example: 1,
        },
        tieu_de: {
            type: "string",
            required: false,
            example: "Tiêu đề 1",
        },
        dien_gia: {
            type: "number",
            required: false,
            example: 1,
        },
        cuoc_hop_id: {
            type: "number",
            required: false,
            example: 1,
        },

        ngay_dien_ra: {
            type: "date",
            required: false,
            example: dateToYMD(),
        },
        gio_bat_dau: {
            type: "string",
            required: false,
            example: dateToHm(),
        },
        gio_ket_thuc: {
            type: "string",
            required: false,
            example: dateToHm(),
        },
        mo_ta: {
            type: "string",
            required: false,
            example: "Mô tả 1",
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
                    "application/json": {
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
                description: getDescription(),
                content: {
                    "application/json": {
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
    [`${prefix}/delete/{id}`]: {
        delete: {
            tags: [PREFIX_NAME],
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
            parameters: [],
            // parameters: [...getPropertiesPaging(PREFIX_NAME)],
            summary: `Lấy all ${PREFIX_NAME}`,
            responses: responseCodeGeneral,
        },
    },
};
