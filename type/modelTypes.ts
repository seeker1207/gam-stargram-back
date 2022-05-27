interface Config {
    username: string;
    password: string | undefined;
    database: string;
    host: string;
    dialect: string;
}

interface DotenvConfig {
    [key: string]: Config
}

export { DotenvConfig, Config };
