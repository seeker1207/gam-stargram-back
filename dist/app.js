"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./models"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
models_1.default.sequelize.sync()
    .then(() => {
    console.log('DB 연결 성공!');
})
    .catch(console.error);
app.get('/', (req, res) => {
    res.send('hello express!');
});
app.listen(port, () => {
    console.log(`서버 실행 중!! http://localhost:${port}`);
});
