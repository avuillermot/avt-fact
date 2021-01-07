import moment = require("moment");
import mongoose, { model, Schema } from "mongoose";
import { IDocument } from "./../interface.base";
import { DefaultBaseDocumentDef } from "../schema.document.base";
import { IStatus } from "../document/status";
import { IEntity } from "../entity/entity"
import { ICustomer } from "../entity/customer"
import { IItemLine } from "./itemLine";

const _DefaultQuoteSchema: Schema = new Schema(DefaultBaseDocumentDef);
_DefaultQuoteSchema.add({
    entityId: { type: String, required: true },
    expirationDate: { type: Date, required: true, default: moment().utc().add(30, "days").toDate() }
});
_DefaultQuoteSchema.index({ entityId: 1});

_DefaultQuoteSchema.pre("save", function (next) {
    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())

    var total = 0
    var taxAmount = 0;
    if (this.get("items").length != null && this.get("items").length != undefined) {
        for (var i = 0; i < this.get("items").length; i++) {
            total = total + this.get("items")[i].get("total");
            taxAmount = taxAmount + this.get("items")[i].get("taxAmount");
        }
    }
    this.set("total", total);
    this.set("taxAmount", taxAmount);
    this.set("totalFreeTax", total - taxAmount);
    next();
});
_DefaultQuoteSchema.pre("updateOne", function (next) {
    let _update = this["_update"];
    _update["updated"] = moment().utc().toDate();

    if (_update["items"] != null && _update["items"] != undefined) {
        var total = 0
        var taxAmount = 0;
        for (var i = 0; i < _update["items"].length; i++) {
            total = total + _update["items"][i].total;
            taxAmount = taxAmount + _update["items"][i].taxAmount;
        }
        _update["total"] = total;
        _update["taxAmount"] = taxAmount;
        _update["totalFreeTax"] = total - taxAmount;
    }
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
