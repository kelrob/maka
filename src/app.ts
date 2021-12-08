// Important Import
import express, { Application } from "express";
import { Routes } from "./routes/index";
require("dotenv").config();

class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default new App().app;
