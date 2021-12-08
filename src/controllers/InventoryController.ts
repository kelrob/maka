import { Request, Response } from "express";
import { Utils } from "../utils";

const utils = new Utils();
let inventories = [];
let soldItems = [];

export class InventoryController {
  store(req: Request, res: Response) {
    try {
      // Get the inputed data
      let inventory = req.body.inventory;

      // Validate type of data submitted.
      if (!Array.isArray(inventory))
        return utils.formatResponse(
          res,
          400,
          false,
          "Invalid Data Submitted. Cannot Process request."
        );

      // Add or Update Item to inventories
      inventory.forEach((item) => {
        if (Number.isInteger(item.quantity) && Number.isInteger(item.itemID)) {
          if (utils.itemIDExists(item.itemID, inventories)) {
            let itemIndex = inventories.findIndex(
              (key) => key.itemID === item.itemID
            );
            inventories[itemIndex].itemName = item.itemName;
            inventories[itemIndex].quantity = item.quantity;
          } else {
            inventories.push(item);
          }
        } else {
          utils.formatResponse(
            res,
            400,
            false,
            `Invalid data type pased for "quantity" or "itemID"`
          );
        }
      });

      // Show latest Inventory
      utils.formatResponse(
        res,
        201,
        true,
        "Item Added Successfully",
        inventories
      );
    } catch (error) {
      utils.formatResponse(res, 500, false, error.toString());
    }
  }

  liveBuy(req: Request, res: Response) {
    try {
      const itemID = parseInt(req.params.item_id);
      const showID = parseInt(req.params.show_id);

      // check if item id exist inventory
      if (utils.itemIDExists(itemID, inventories)) {
        // Get the item index
        const itemIndex = inventories.findIndex((key) => key.itemID === itemID);

        // Check if theren is still enough inventory and update the inventory
        if (inventories[itemIndex].quantity > 0) {
          inventories[itemIndex].quantity -= 1;

          if (utils.itemIDExists(itemID, soldItems)) {
            const itemIndex = soldItems.findIndex(
              (key) => key.itemID === itemID
            );
            soldItems[itemIndex].quantity_sold += 1;
          } else {
            // Add item to sold items
            soldItems.push({
              showID: showID,
              itemID: itemID,
              itemName: inventories[itemIndex].itemName,
              quantity_sold: 1,
              timeCreated: new Date().toLocaleString(),
            });
          }
          utils.formatResponse(
            res,
            201,
            true,
            "Item bought successfully!",
            soldItems
          );
        } else {
          utils.formatResponse(res, 400, false, "Item already sold out!");
        }
      } else {
        utils.formatResponse(res, 400, false, "Item ID does not exist");
      }
    } catch (error) {
      utils.formatResponse(res, 500, false, error.toString());
    }
  }

  soldItems(req: Request, res: Response) {
    try {
      const itemID = parseInt(req.params.item_id);
      const showID = parseInt(req.params.show_id);

      if (utils.itemIDExists(itemID, soldItems) == false)
        return utils.formatResponse(
          res,
          400,
          false,
          "ItemID not found in sold Items"
        );

      // check if show id exist inventory
      if (utils.showIDExists(showID, soldItems)) {
        soldItems.forEach((item, index) => {
          if (item.itemID === itemID && item.showID === showID) {
            utils.formatResponse(
              res,
              200,
              true,
              "Data Retrieved successfully",
              {
                itemID: soldItems[index].itemID,
                itemName: soldItems[index].itemID,
                quantity_sold: soldItems[index].quantity_sold,
              }
            );
          }
        });
      } else {
        utils.formatResponse(res, 400, false, "Show ID does not exist");
      }
    } catch (error) {
      utils.formatResponse(res, 500, false, error.toString());
    }
  }

  soldItemsByShow(req: Request, res: Response) {
    try {
      let result = [];
      const showID = parseInt(req.params.show_id);
      if (utils.showIDExists(showID, soldItems) == false)
        return utils.formatResponse(
          res,
          400,
          false,
          "showId not found in sold Items"
        );

      soldItems.forEach((item) => {
        if (item.showID === showID) {
          result.push(item);
        }
      });

      utils.formatResponse(
        res,
        200,
        true,
        "Data retrieved successfully",
        result
      );
    } catch (error) {
      utils.formatResponse(res, 500, false, error.toString());
    }
  }
}
