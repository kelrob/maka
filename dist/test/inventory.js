"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const server_1 = __importDefault(require("../server"));
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
require("mocha");
(0, chai_1.should)();
chai_1.default.use(chai_http_1.default);
describe("/GET healthz", () => {
    it("it should check the health status of the api", (done) => {
        chai_1.default
            .request(server_1.default)
            .get("/api/v1/healthz")
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.should.have.property("status").eql(true);
            done();
        });
    });
});
describe("/POST inventory", () => {
    it("it should POST a new item", (done) => {
        let inventory = [{ itemID: 12345, itemName: "itemName", quantity: 10 }];
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/inventory")
            .set("content-type", "application/json")
            .send({ inventory })
            .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(true);
            res.body.data.should.be.a("array");
            done();
        });
    });
});
describe("/POST show/:show_id/buy_item/:item_id", () => {
    it("it make a live buy", (done) => {
        chai_1.default
            .request(server_1.default)
            .post("/api/v1/show/1/buy_item/12345")
            .set("content-type", "application/json")
            .send({})
            .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(true);
            done();
        });
    });
});
describe("/GET show/:show_id/sold_items/:item_id", () => {
    it("it show all sold items with passed id and item id", (done) => {
        chai_1.default
            .request(server_1.default)
            .get("/api/v1/show/1/sold_items/12345")
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(true);
            done();
        });
    });
});
describe("/GET show/:show_id/sold_items/", () => {
    it("it show all sold items tied to a show id", (done) => {
        chai_1.default
            .request(server_1.default)
            .get("/api/v1/show/1/sold_items/12345")
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status").eql(true);
            done();
        });
    });
});
