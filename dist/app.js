"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Important Import
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
require("dotenv").config();
class App {
    constructor() {
        this.routePrv = new index_1.Routes();
        this.app = (0, express_1.default)();
        this.config();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
}
exports.default = new App().app;
