"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
const typeorm_1 = require("typeorm");
const env = process.env.NODE_ENV || 'development';
const config = config_1.default[env];
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config.host,
    port: 3306,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [user_1.default],
    synchronize: true,
    logging: true,
});
exports.default = AppDataSource;
