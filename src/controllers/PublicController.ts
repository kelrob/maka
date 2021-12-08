import { Request, Response } from "express";
import { Utils } from "../utils";

const utils = new Utils();
export class PublicController {
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
