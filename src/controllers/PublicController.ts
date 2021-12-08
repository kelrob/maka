import { Request, Response } from "express";
import { Utils } from "../utils";

const utils = new Utils();
export class PublicController {
  index(req: Request, res: Response) {
    try {
      return res.redirect("/api/v1/healthz");
    } catch (error) {
      console.log(error);
    }
  }

  healthz(req: Request, res: Response) {
    try {
      return utils.formatResponse(
        res,
        200,
        true,
        "Maka API is live and running. Happy Coding :)"
      );
    } catch (error) {
      console.log(error);
    }
  }
}
