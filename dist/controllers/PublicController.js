"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicController = void 0;
const utils_1 = require("../utils");
const utils = new utils_1.Utils();
class PublicController {
    index(req, res) {
        try {
            return res.redirect("/api/v1/healthz");
        }
        catch (error) {
            console.log(error);
        }
    }
    healthz(req, res) {
        try {
            return utils.formatResponse(res, 200, true, "Maka API is live and running. Happy Coding :)");
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.PublicController = PublicController;
