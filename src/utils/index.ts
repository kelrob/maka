export class Utils {
  // Properly format response to json
  public formatResponse(
    res: any,
    code: number,
    status: boolean = false,
    message: any = "Error",
    data: any = {}
  ) {
    res.status(code).json({
      status: status,
      message: message,
      data: data,
    });
  }

  // Properly check if itemId exist in an array
  public itemIDExists(itemID, arr) {
    return arr.some(function (el) {
      return el.itemID === itemID;
    });
  }

  public showIDExists(showID, arr) {
    return arr.some(function (el) {
      return el.showID === showID;
    });
  }
}
