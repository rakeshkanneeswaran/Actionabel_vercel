"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const simple_git_1 = __importDefault(require("simple-git"));
const utils_1 = require("./utils");
const file_1 = __importDefault(require("./file"));
const aws_1 = __importDefault(require("./aws"));
const redis_1 = require("redis");
const publisher = (0, redis_1.createClient)();
publisher.connect();
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repourl = req.body.repoUrl;
    console.log(repourl);
    const id = (0, utils_1.idGenerator)();
    yield (0, simple_git_1.default)().clone(repourl, __dirname + `/output/${id}`);
    const allfilesArray = (0, file_1.default)(__dirname + `/output/${id}`);
    allfilesArray.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, aws_1.default)(file.slice(__dirname.length + 1), file);
    }));
    yield new Promise((resolve) => setTimeout(resolve, 10000));
    publisher.lPush("build-queue", id);
    publisher.hSet("status", id, "uploaded");
    return res.json({
        id: id
    });
}));
app.get("/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const response = yield subscriber.hGet("status", id);
    res.json({
        status: response
    });
}));
app.listen(3000, () => {
    console.log('server is running on port 3000', "url is http://localhost:3000");
});
