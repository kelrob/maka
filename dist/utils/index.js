"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    // Properly format response to json
    formatResponse(res, code, status = false, message = "Error", data = {}) {
        res.status(code).json({
            status: status,
            message: message,
            data: data,
        });
    }
    // Properly check if itemId exist in an array
    itemIDExists(itemID, arr) {
        return arr.some(function (el) {
            return el.itemID === itemID;
        });
    }
    showIDExists(showID, arr) {
        return arr.some(function (el) {
            return el.showID === showID;
        });
    }
}
exports.Utils = Utils;
