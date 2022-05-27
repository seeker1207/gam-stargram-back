"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const models_1 = require("./models");
const passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
models_1.db.sequelize.sync()
    .then(() => {
    console.log('DB 연결 성공!');
})
    .catch(console.error);
(0, passport_2.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/', (req, res) => {
    res.send('hello express!');
});
app.listen(port, () => {
    console.log(`서버 실행 중!! http://localhost:${port}`);
});
