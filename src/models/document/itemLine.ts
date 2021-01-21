import mongoose, { model, Schema } from "mongoose";
import { IBase } from "./../interface.base";
import { HookHelper } from './../hook.helper';
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
    HookHelper.onValidate(this);
    next();
});

DefaultItemLineSchema.pre("updateOne", function (next) {
    HookHelper.onValidate(this["_update"]);
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