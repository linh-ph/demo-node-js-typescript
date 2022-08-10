/* eslint-disable @typescript-eslint/no-explicit-any */
export const getPropertiesPaging = (
    prefixName: string
): Array<{ [key: string]: any }> => {
    return [
        {
            name: "page_number",

            in: "query",
            description: `page_number của ${prefixName}`,
            required: true,

            schema: {
                type: "integer",
                format: "int64",
            },
        },
        {
            name: "item_per_page",

            in: "query",
            description: `item_per_page của ${prefixName}`,
            required: true,

            schema: {
                type: "integer",
                format: "int64",
            },
        },
    ];
};
