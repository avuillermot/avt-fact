import mongoose, { model, Schema } from "mongoose";
import { IBase } from "./../interface.base";
import { HookHelper } from './../hook.helper';
var Float = require('mongoose-float').loadType(mongoose, 2);

const SchBaseProduct = {
    created: { type: Date, required: true, default: null },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: null },
    updatedBy: { type: String, required: true, default: "create_process" },

    entityId: { type: String, required: true },
    code: { type: String, required: true, default: "NO_CODE" },
    name: { type: String, required: true, default: "(?)" },
    description: { type: String, required: false},
    price: { type: Float, required: true, default: 0 },
    taxPercent: { type: Float, required: true, default: 0 },
    deleted: { type: Boolean, required: true, default: false }
}

export const DefaultProductSchema: Schema = new Schema(SchBaseProduct);
DefaultProductSchema.pre("validate", function (next) {
    HookHelper.onValidate(this);
    next();
});
DefaultProductSchema.pre("updateOne", function (next) {
    HookHelper.onValidate(this["_update"]);
    next();
});

export interface IProduct extends IBase {
    entityId: string;
    code: string;
    name: string;
    description: string;
    price: number;
    taxPercent: number;
}

export default model<IProduct>('Product', DefaultProductSchema);