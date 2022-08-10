import { responseCodeGeneral } from "../helper/responses";
import { getUpperCaseFirstLetter, dateToYMD } from "../helper/utils";
import { resetExample } from "../helper/requests";
import { getPropertiesPaging } from "./general";
const prefix = "/event";
const PREFIX_NAME = getUpperCaseFirstLetter(prefix.replace("/", ""));

const getDescriptionEvent = (): string => {
    return `
    ten
    so_luong
    ngay_bat_dau: Now < 2021-05-20 16:37:29(YYYY-MM-DD HH-mm-ss)
    ngay_ket_thuc: ngay_bat_dau < 2021-05-20 16:37:29(YYYY-MM-DD HH-mm-ss)
    loai_su_kien_id
    tinh_chat_id
    tinh_trang_id
    thuoc_tinh_id
    chu_de
    thu_moi_id

    da_du_noi_dung
    nha_to_chuc_id:

    file: http://localhost:8000/assets/file/hkg-2021-06-21T13:10:30.000Z-Webtietkiem.com-Day-con-lam-giau-tap-1-2-3-4-5.pdf

  
    `;
};

const getDescriptionForeign = (): string => {
    return `
    ----------------> Các bản tham chiếu xóa nhớ để ý.
    eventType:*
    nature:*
    properties:*
    organizer:*
    status:*
    bannerEvent: [] | [{}...] không bắt buộc. (xóa ko ảnh hưởng).
    file: {} | null không bắt buộc
`;
};

const getPropertiesEvent = (): { [key: string]: any } => {
    return {
        ten: {
            type: "string",
            required: false,
            example: "sự kiện 1",
        },
        so_luong: {
            type: "number",
            required: false,
            example: 1,
        },

        ngay_bat_dau: {
            type: "date",
            required: false,
            example: dateToYMD(),
        },

        ngay_ket_thuc: {
            type: "date",
            required: false,
            example: dateToYMD(1),
        },
        loai_su_kien_id: {
            type: "number",
            required: false,
            example: 1,
        },
        tinh_chat_id: {
            type: "number",
            required: false,
            example: 1,
        },
        tinh_trang_id: {
            type: "number",
            required: false,
            example: 1,
        },
        thuoc_tinh_id: {
            type: "number",
            required: false,
            example: 1,
        },
        chu_de: {
            type: "string",
            required: false,
            example: "user1",
        },
        thu_moi_id: {
            type: "number",
            required: false,
            example: 1,
        },

        da_du_noi_dung: {
            type: "number",
            required: false,
            example: 1,
        },

        nha_to_chuc_id: {
            type: "number",
            required: false,
            example: 1,
        },
        file: {
            type: "string",
            required: false,
            example: "",
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
                description: getDescriptionEvent(),
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...getPropertiesEvent(),
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
                description: getDescriptionEvent(),
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...getPropertiesEvent(),
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
            description: getDescriptionForeign(),
            security: [
                {
                    jwt: [],
                },
            ],
            parameters: [...getPropertiesPaging(PREFIX_NAME)],
            summary: `Lấy all ${PREFIX_NAME}`,
            responses: responseCodeGeneral,
        },
    },
};
