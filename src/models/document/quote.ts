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
    expirationDate: { type: Date, required: true, default: moment().utc().add(30, "days") }
});
_DefaultQuoteSchema.index({ entityId: 1});

_DefaultQuoteSchema.pre("validate", function (next) {
    if (this.get("created") == null) this.set("created", moment().utc());
    this.set("updated", moment().utc())

    let total:number = 0
    let taxAmount:number = 0;
    if (this.get("items").length != null && this.get("items").length != undefined) {
        for (var i = 0; i < this.get("items").length; i++) {
            let current = this.get("items")[i];
            current.set("total", (current.quantity * current.price) * (1 + current.taxPercent / 100) );
            current.set("taxAmount", (current.quantity * current.price) * (current.taxPercent / 100) );
            current.set("totalFreeTax", current.total - current.taxAmount);

            total = total + current.total;
            taxAmount = taxAmount + current.taxAmount;
            /*console.log("*******************");
            console.log("price:" + this.get("items")[i].price);
            console.log("quantity:" + this.get("items")[i].quantity);
            console.log("total:"+this.get("items")[i].total);
            console.log("taxAmount:"+this.get("items")[i].taxAmount);
            console.log("totalFreeTax:"+this.get("items")[i].totalFreeTax);*/
        }
    }
    this.set("total", total);
    this.set("taxAmount", taxAmount);
    this.set("totalFreeTax", total - taxAmount);
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
