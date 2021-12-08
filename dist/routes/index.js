"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const PublicController_1 = require("../controllers/PublicController");
const InventoryController_1 = require("../controllers/InventoryController");
class Routes {
    constructor() {
        this.publicController = new PublicController_1.PublicController();
        this.inventoryController = new InventoryController_1.InventoryController();
        this.baseUrl = process.env.BASE_URL || "/api/v1/";
    }
    routes(app) {
        // Check health status of api
        app.get(this.baseUrl + "healthz", this.publicController.healthz);
        // Add item or update inventory
        app.post(this.baseUrl + "inventory", this.inventoryController.store);
        // Live buy
        app.post(this.baseUrl + "show/:show_id/buy_item/:item_id", this.inventoryController.liveBuy);
        // Show sold items
        app.get(this.baseUrl + "show/:show_id/sold_items/:item_id", this.inventoryController.soldItems);
        // Show sold items by show
        app.get(this.baseUrl + "show/:show_id/sold_items", this.inventoryController.soldItemsByShow);
    }
}
exports.Routes = Routes;
