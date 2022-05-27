import {Dialect} from "sequelize";

interface Config {
    username: string;
    password: string | undefined;
    database: string;
    host: string;
    dialect: Dialect;
}

interface DotenvConfig {
    [key: string]: Config
}


export { DotenvConfig, Config };
