import { Schema, Document, model } from "mongoose";
import moment = require("moment");
import { IBase } from "./model-base";

export interface IItemInvoice extends IBase {
    quantity: number;
    price: number;
    description:string
}

export const DefaultItemInvoiceSchema: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_invoice" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_invoice" },

    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 }
});

export default model<IItemInvoice>('ItemInvoice', DefaultItemInvoiceSchema);