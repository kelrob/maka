import { Application } from "express";
import { PublicController } from "../controllers/PublicController";
import { InventoryController } from "../controllers/InventoryController";

export class Routes {
  public publicController: PublicController = new PublicController();
  public inventoryController: InventoryController = new InventoryController();
  public baseUrl: string = process.env.BASE_URL || "/api/v1/";

  public routes(app: Application): void {
    app.get("/", this.publicController.index);

    // Check health status of api
    app.get(this.baseUrl + "healthz", this.publicController.healthz);

    // Add item or update inventory
    app.post(this.baseUrl + "inventory", this.inventoryController.store);

    // Live buy
    app.post(
      this.baseUrl + "show/:show_id/buy_item/:item_id",
      this.inventoryController.liveBuy
    );

    // Show sold items
    app.get(
      this.baseUrl + "show/:show_id/sold_items/:item_id",
      this.inventoryController.soldItems
    );

    // Show sold items by show
    app.get(
      this.baseUrl + "show/:show_id/sold_items",
      this.inventoryController.soldItemsByShow
    );
  }
}
