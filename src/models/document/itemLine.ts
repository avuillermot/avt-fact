import mongoose, { model, Schema } from "mongoose";
import { IBase } from "./../interface.base";
import moment = require("moment");
var Float = require('mongoose-float').loadType(mongoose, 2);

const DefaultItemLineSchemaDef = {
    created: { type: Date, required: true, default: null },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: null },
    updatedBy: { type: String, required: true, default: "create_process" },

    entityId: { type: String, required: true },
    code: { type: String, required: true, default: "NO_CODE" },
    name: { type: String, required: true, default: "(?)" },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Float, required: true, default: 0 },
    total: { type: Float, required: true, default: 0 },
    totalFreeTax: { type: Number, required: true, default: 0 },
    taxAmount: { type: Float, required: true, default: 0 },
    taxPercent: { type: Float, required: true, default: 0 },
    order: {type: Number, required:true }
} 

export const DefaultItemLineSchema: Schema = new Schema(DefaultItemLineSchemaDef);
DefaultItemLineSchema.pre("validate", function (next) {
    let taxPercent = 1 + (this.get("taxPercent") / 100);
    let total = this.get("quantity") * this.get("price") * taxPercent;
    let taxAmount = total - (this.get("quantity") * this.get("price"));

    if (this.get("created") == null) this.set("created", moment().utc());
    this.set("updated", moment().utc())
    this.set("total", total);
    this.set("totalFreeTax", total - taxAmount);
    this.set("taxAmount", taxAmount);

    next();
});

export interface IItemLine extends IBase {
    entityId: string;
    code: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
    totalFreeTax: number;
    taxAmount: number;
    taxPercent: number;
    order: number;
}

export default model<IItemLine>('IItemLine', DefaultItemLineSchema);