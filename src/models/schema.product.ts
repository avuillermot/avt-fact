import mongoose, { Schema } from "mongoose";
import moment = require("moment");
var Float = require('mongoose-float').loadType(mongoose, 2);

const SchemaBaseProduct = {
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_process" },

    entityId: { type: String, required: true },
    productCode: { type: String, required: true, default: "NO_CODE" },
    productName: { type: String, required: true, default: "(?)" },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Float, required: true, default: 0 },
    total: { type: Float, required: true, default: 0 },
    totalFreeTax: { type: Number, required: true, default: 0 },
    taxAmount: { type: Float, required: true, default: 0 },
    taxPercent: { type: Float, required: true, default: 0 }
}
export const DefaultProductSchema: Schema = new Schema(SchemaBaseProduct);
DefaultProductSchema.pre("save", function (next) {
    let taxPercent = 1 + (this.get("taxPercent") / 100);
    let total = this.get("quantity") * this.get("price") * taxPercent;
    let taxAmount = total - (this.get("quantity") * this.get("price"));

    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())
    this.set("total", total);
    this.set("totalFreeTax", total - taxAmount);
    this.set("taxAmount", taxAmount);

    next();
});