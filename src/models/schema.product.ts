import mongoose, { Schema } from "mongoose";
import moment = require("moment");
var Float = require('mongoose-float').loadType(mongoose, 2);

const SchemaBaseProduct = {
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_process" },

    entityId: { type: String, required: true },
    code: { type: String, required: true, default: "NO_CODE" },
    name: { type: String, required: true, default: "(?)" },
    price: { type: Float, required: true, default: 0 },
    taxPercent: { type: Float, required: true, default: 0 },
    deleted: { type: String, required: true, default: false }
}
export const DefaultProductSchema: Schema = new Schema(SchemaBaseProduct);
DefaultProductSchema.pre("save", function (next) {
    let taxPercent = 1 + (this.get("taxPercent") / 100);

    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())

    next();
});