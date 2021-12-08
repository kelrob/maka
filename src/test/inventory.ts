process.env.NODE_ENV = "test";

import app from "../server";
import chai, { should, expect } from "chai";
import chaiHttp from "chai-http";
import "mocha";
should();

chai.use(chaiHttp);

describe("/GET healthz", () => {
  it("it should check the health status of the api", (done) => {
    chai
      .request(app)
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
    chai
      .request(app)
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
    chai
      .request(app)
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
    chai
      .request(app)
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
    chai
      .request(app)
      .get("/api/v1/show/1/sold_items/12345")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(true);
        done();
      });
  });
});
