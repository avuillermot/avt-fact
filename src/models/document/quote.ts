import moment = require("moment");
import mongoose, { model, Schema } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultBaseDocument } from "../schema.document.base";
import { IStatus } from "../document/status";
import { IEntity } from "../entity/entity"
import { ICustomer } from "../entity/customer"
import { IItemLine } from "./itemLine";

const _DefaultQuoteSchema: Schema = new Schema(DefaultBaseDocument);
_DefaultQuoteSchema.add({
    entityId: { type: String, required: true },
    expirationDate: { type: Date, required: true, default: moment().utc().add(30, "days").toDate() }
});
_DefaultQuoteSchema.pre("save", function (next) {
    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())

    var total = 0
    var taxAmount = 0;
    for (var i = 0; i < this.get("items").length; i++) {
        total = total + this.get("items")[i].get("total");
        taxAmount = taxAmount + this.get("items")[i].get("taxAmount");
    }
    this.set("total", total);
    this.set("taxAmount", taxAmount);
    this.set("totalFreeTax", total - taxAmount);
    next();
});
_DefaultQuoteSchema.pre("updateOne", function (next) {
    this.getUpdate().updated = moment().utc().toDate();

    var total = 0
    var taxAmount = 0;
    for (var i = 0; i < this.getUpdate().items.length; i++) {
        total = total + this.getUpdate().items[i].total;
        taxAmount = taxAmount + this.getUpdate().items[i].taxAmount;
    }
    this.getUpdate().total = total;
    this.getUpdate().taxAmount = taxAmount;
    this.getUpdate().totalFreeTax = total - taxAmount;
    next();
});

export interface IQuote extends IBase {
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
