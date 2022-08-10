import { responseCodeGeneral } from "../helper/responses";
import { getUpperCaseFirstMultipleLetter } from "../helper/utils";
import { resetExample } from "../helper/requests";

const prefix = "/meetingMember";
const PREFIX_NAME = getUpperCaseFirstMultipleLetter(prefix.replace("/", ""));

const getDescription = (): string => {
    return `
    cuoc_hop_id: 
    nguoi_dung_id: 
    vi_tri: 
    trang_thai:
    ghi_chu:
    chu_tri: 0 : không phải chủ trì | 1: chủ trì cuộc họp
    `;
};

const getProperties = (): { [key: string]: any } => {
    return {
        cuoc_hop_id: {
            type: "number",
            required: false,
            example: 1,
        },
        nguoi_dung_id: {
            type: "number",
            required: false,
            example: 1,
        },
        chu_tri: {
            type: "number",
            required: false,
            example: 0,
        },
        vi_tri: {
            type: "string",
            required: false,
            example: "vi trí 1",
        },
        trang_thai: {
            type: "string",
            required: false,
            example: "online",
        },
        ghi_chu: {
            type: "string",
            required: false,
            example: "ghi chú 1",
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
