import { Schema, Document, model } from "mongoose";
import moment = require("moment");
import { IBase } from "./model-base";
import { IItemInvoice, DefaultItemInvoiceSchema } from "./itemInvoice";

export interface IInvoice extends IBase {
    invoiceFileName: string;
    invoiceDate: Date;
    invoiceNumber: string;
    deliveryDate:Date;
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
}

export const DefaultInvoiceSchema: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_invoice" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_invoice" },

    invoiceDate: { type: Date, required: true },
    invoiceFileName: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    deliveryDate: { type: Date, required: true },

    customerLabel: { type: String, required: true },
    customerName: { type: String, required: true },
    customerAddress1: { type: String, required: true },
    customerAddress2: { type: String, required: false },
    customerAddress3: { type: String, required: false },
    customerZipCode: { type: String, required: true },
    customerCity: { type: String, required: true },
    customerCountry: { type: String, required: true },

    invoiceLabel: { type: String, required: true },
    invoiceAddress1: { type: String, required: true },
    invoiceAddress2: { type: String, required: false },
    invoiceAddress3: { type: String, required: false },
    invoiceZipCode: { type: String, required: true },
    invoiceCity: { type: String, required: true },
    invoiceCountry: { type: String, required: true },

    providerId1: { type: String, required: true },
    providerId2: { type: String, required: false },
    providerId3: { type: String, required: false },

    providerName: { type: String, required: true },
    providerAddress1: { type: String, required: true },
    providerAddress2: { type: String, required: false },
    providerAddress3: { type: String, required: false },
    providerZipCode: { type: String, required: true },
    providerCity: { type: String, required: true },
    providerCountry: { type: String, required: true },
    providerEmail: { type: String, required: true },
    providerPhone: { type: String, required: true },

    items: { type: [DefaultItemInvoiceSchema]}
});

export default model<IInvoice>('Invoice', DefaultInvoiceSchema);