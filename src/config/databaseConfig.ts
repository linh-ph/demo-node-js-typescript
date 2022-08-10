import "dotenv/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getConfigDatabase = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
        supportBigNumbers: true,
    },
    define: {
        freezeTableName: true,
        charset: "utf8",
        dialectOptions: {
            collate: "utf8_unicode_ci",
        },
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        timestamps: false,
    },
    logging: false,
    timezone: "+00:00",
};

const config: { [key: string]: unknown } = {
    development: {
        ...getConfigDatabase,
        debug: true,
    },
    production: {
        ...getConfigDatabase,
        debug: false,
    },
};

module.exports = process.env.NODE_ENV
    ? config[process.env.NODE_ENV]
    : config["development"];
