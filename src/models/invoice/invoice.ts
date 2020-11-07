import { model } from "mongoose";
import moment = require("moment");
import { IBase, DefaultInvoiceSchema } from "../schema-base";
import { IItemInvoice } from "./itemInvoice";
import { IStatusInvoice } from "./statusInvoice";

export interface IInvoice extends IBase {
    invoiceFileName: string;
    invoiceDate: Date;
    invoiceNumber: string;
    deliveryDate: Date;
    customerLabel: string;
    customerName: string;
    customerAddress1: string;
    customerAddress2: string;
    customerAddress3: string;
    customerZipCode: string;
    customerCity: string;
    customerCountry: string;
    invoiceLabel: string;
    invoiceAddress1: string;
    invoiceAddress2: string;
    invoiceAddress3: string;
    invoiceZipCode: string;
    invoiceCity: string;
    invoiceCountry: string;
    providerId1: string;
    providerId2: string;
    providerId3: string;
    providerName: string;
    providerAddress1: string;
    providerAddress2: string;
    providerAddress3: string;
    providerZipCode: string;
    providerCity: string;
    providerCountry: string;
    providerEmail: string;
    providerPhone: string;
    items: IItemInvoice[];
    status: string;
    statusHistory: IStatusInvoice[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
}

DefaultInvoiceSchema.pre("save", function (next) {
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

export default model<IInvoice>('Invoice', DefaultInvoiceSchema);