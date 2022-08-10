import { responseCodeGeneral } from "../helper/responses";
import { getUpperCaseFirstMultipleLetter } from "../helper/utils";
import { resetExample } from "../helper/requests";

const prefix = "/utils";
const PREFIX_NAME = getUpperCaseFirstMultipleLetter(prefix.replace("/", ""));
export default {
    [`${prefix}/upload-image`]: {
        post: {
            tags: [PREFIX_NAME],
            deprecated: true,
            summary: `Upload Image ${PREFIX_NAME}`,
            description: "",
            security: [
                {
                    jwt: [],
                },
            ],
            parameters: [],
            requestBody: {
                description: `
         
          files*: 10 file| total_limit: 1mb| file_name:255 character
         
          `,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                files: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                            },
                        },
                    },
                },
                required: true,
            },

            responses: responseCodeGeneral,
        },
    },
};
