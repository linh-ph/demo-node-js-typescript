import { responseCodeGeneral } from "../helper/responses";
import { resetExample } from "../helper/requests";
const prefix = "/auth";
export default {
  [`${prefix}/login`]: {
    post: {
      tags: ["Auth"],
      description: "",
      parameters: [],
      requestBody: {
        description: `
           email*
           mat_khau*
           `,
        $ref: "#/components/requestBodies/LoginBody",
      },
      summary: "Đăng nhập",
      responses: responseCodeGeneral,
    },
  },
  [`${prefix}/forgot`]: {
    post: {
      tags: ["Auth"],
      description: "",
      parameters: [],
      requestBody: {
        description: `
           email*
           `,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "user1@gmail.com",
                },
              },
              required: ["email"],
            },
            ...resetExample,
          },
        },
      },
      summary: "Quên mật khẩu",
      responses: responseCodeGeneral,
    },
  },

  [`${prefix}/register`]: {
    post: {
      tags: ["Auth"],
      deprecated: true,
      description: "Đăng ký không cần xác thực",
      parameters: [],
      requestBody: {
        description: `
           email*
           `,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
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
                mat_khau: {
                  type: "string",
                  required: true,
                  example: "Aa@123",
                },
                phan_quyen: {
                  type: "string",
                  required: true,
                  example: "user",
                },
                sdt: {
                  type: "string",
                  required: true,
                  example: "0356241963",
                },
                gioi_tinh: {
                  type: "number",
                  required: false,
                  example: 1,
                },
                kich_hoat: {
                  type: "number",
                  required: false,
                  example: 1,
                },
              },
              required: ["ten", "email", "mat_khau", "phan_quyen", "sdt"],
            },
            ...resetExample,
          },
        },
      },
      summary: "Auth of user",
      responses: responseCodeGeneral,
    },
  },

  [`${prefix}/refresh`]: {
    post: {
      tags: ["Auth"],
      description: ``,
      parameters: [],
      requestBody: {
        description: `
           refresh_token*
           `,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refresh_token: {
                  type: "string",
                  required: true,
                },
              },
              required: ["refresh_token"],
            },
            ...resetExample,
          },
        },
        required: true,
      },

      summary: "Làm mới token",
      responses: responseCodeGeneral,
    },
  },
  [`${prefix}/logout`]: {
    post: {
      tags: ["Auth"],
      description: ``,
      security: [
        {
          jwt: [],
        },
      ],
      summary: "Đăng xuất",
      responses: responseCodeGeneral,
    },
  },
};

export const LoginBody = {
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            example: "user1@gmail.com",
          },
          mat_khau: {
            type: "string",
            example: "Aa@123",
          },
        },
        required: ["email", "mat_khau"],
      },
      ...resetExample,
    },
  },
};
