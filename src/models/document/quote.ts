import moment = require("moment");
import { model, Schema } from "mongoose";
import { IDocument } from "./../interface.base";
import { DefaultBaseDocumentDef } from "../schema.document.base";
import { IStatus } from "../document/status";
import { IEntity } from "../entity/entity"
import { ICustomer } from "../entity/customer"
import { IItemLine } from "./itemLine";
import { HookHelper } from './../hook.helper';

const _DefaultQuoteSchema: Schema = new Schema(DefaultBaseDocumentDef);
_DefaultQuoteSchema.add({
    entityId: { type: String, required: true },
    expirationDate: { type: Date, required: true, default: moment().utc().add(30, "days") }
});
_DefaultQuoteSchema.index({ entityId: 1});

_DefaultQuoteSchema.pre("validate", function (next) {
    HookHelper.onValidate(this);
    next();
});

_DefaultQuoteSchema.pre("updateOne", function (next) {
    HookHelper.onValidate(this["_update"]);
    next();
});

export interface IQuote extends IDocument {
    entityId: string,
    fileName: string;
    date: Date;
    expirationDate: Date;
    number: string;
    customer: ICustomer;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    seller: IEntity;
    items: IItemLine[];
    status: string;
    statusHistory: IStatus[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
}

export default model<IQuote>('Quote', _DefaultQuoteSchema);
