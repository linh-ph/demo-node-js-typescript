/* eslint-disable @typescript-eslint/no-explicit-any */
import { responseCodeGeneral } from "../helper/responses";
import { resetExample } from "../helper/requests";
import { PrefixRoute } from "../helper/role";
import { dateToYMD, getUpperCaseFirstLetter } from "../helper/utils";

const prefix = PrefixRoute.USER;
const PREFIX_NAME = getUpperCaseFirstLetter(prefix.replace("/", ""));

const getDescriptionUser = (): string => {
    return `
          ten*
          email*
          phan_quyen: user | secretary | admin
          sdt: bắt đầu (84|0)...
          gioi_tinh: \`1\` :nam | \`2\` : nữ
          kich_hoat: 0 : không | 1 : có
          ngay_tham_gia: 2021-05-20 16:37:29(YYYY-MM-DD HH-mm-ss)
          nhom_id
          `;
};

const getPropertiesUser = (): { [key: string]: any } => {
    return {
        ten: {
            type: "string",
            example: "user1",
            required: true,
        },
        email: {
            type: "string",
            required: true,
            example: "user1@gmail.com",
        },
        phan_quyen: {
            type: "string",
            required: false,
            example: "user",
        },
        mat_khau: {
            type: "string",
            required: false,
            example: "Aa@123",
        },
        sdt: {
            type: "string",
            required: false,
            example: "0356241963",
        },
        gioi_tinh: {
            type: "string",
            required: false,
            example: "1",
        },
        kich_hoat: {
            type: "number",
            required: false,
            example: 1,
        },
        ngay_tham_gia: {
            type: "date",
            required: false,
            example: dateToYMD(),
        },
        nhom_id: {
            type: "number",
            required: false,
            example: 1,
        },
    };
};

export default {
    [`${prefix}/add`]: {
        post: {
            tags: [`${PREFIX_NAME}`],
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            requestBody: {
                description: getDescriptionUser(),
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...getPropertiesUser(),
                            },
                        },
                        ...resetExample,
                    },
                },
                required: true,
            },
            summary: `Thêm ${PREFIX_NAME}`,
            responses: responseCodeGeneral,
        },
    },
    [`${prefix}/update/{id}`]: {
        put: {
            tags: [`${PREFIX_NAME}`],
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
                description: getDescriptionUser(),
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...getPropertiesUser(),
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
            tags: ["User"],
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
            tags: [`${PREFIX_NAME}`],
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            summary: `Lấy all ${PREFIX_NAME}`,
            parameters: [
                {
                    name: "page_number",

                    in: "query",
                    description: `page_number của ${PREFIX_NAME}`,
                    required: true,

                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
                {
                    name: "item_per_page",

                    in: "query",
                    description: `item_per_page của ${PREFIX_NAME}`,
                    required: true,

                    schema: {
                        type: "integer",
                        format: "int64",
                    },
                },
                {
                    name: "ten",

                    in: "query",
                    description: `ten của ${PREFIX_NAME}`,
                    required: false,

                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "email",

                    in: "query",
                    description: `email của ${PREFIX_NAME}`,
                    required: false,

                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "sdt",

                    in: "query",
                    description: `sdt của ${PREFIX_NAME}`,
                    required: false,

                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "ten_nhom",

                    in: "query",
                    description: `ten_nhom của ${PREFIX_NAME}`,
                    required: false,

                    schema: {
                        type: "string",
                    },
                },
            ],

            responses: responseCodeGeneral,
        },
    },
};
