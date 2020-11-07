import mongoose, { Schema, Document, model } from "mongoose";
import moment = require("moment");
var Float = require('mongoose-float').loadType(mongoose, 2);

export interface IBase extends Document {
    id: string,
    createdBy: string,
    created: Date,
    updated: Date,
    updatedBy: string
}

const SchemaBaseStatusInvoice: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "system" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "system" },

    status: { type: String, required: true },

});
export const DefaultStatusInvoiceSchema: Schema = new Schema(SchemaBaseStatusInvoice);

const SchemaBaseItemInvoice = {
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_invoice" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_invoice" },

    productCode: { type: String, required: true, default: "NO_CODE" },
    productName: { type: String, required: true, default: "(?)" },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Float, required: true, default: 0 },
    total: { type: Float, required: true, default: 0 },
    totalFreeTax: { type: Float, required: true, default: 0 },
    taxAmount: { type: Float, required: true, default: 0 },
    taxPercent: { type: Float, required: true, default: 0 }
}
export const DefaultItemInvoiceSchema: Schema = new Schema(SchemaBaseItemInvoice);
DefaultItemInvoiceSchema.pre("save", function (next) {
    let taxPercent = 1 + (this.get("taxPercent") / 100);
    let total = this.get("quantity") * this.get("price") * taxPercent;
    let taxAmount = total - (this.get("quantity") * this.get("price"));

    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())
    this.set("total", total);
    this.set("totalFreeTax", total - taxAmount);
    this.set("taxAmount", taxAmount);

    next();
});

const SchemaBaseInvoice = {
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

    status: { type: String, required: true, default: "CREATE" },
    statusHistory: { type: [DefaultStatusInvoiceSchema] },

    items: { type: [DefaultItemInvoiceSchema] },
    total: { type: Float, required: true, default: 0 },
    totalFreeTax: { type: Float, required: true, default: 0 },
    taxAmount: { type: Float, required: true, default: 0 },

    quoteId: { type: String, required: false, default: null },
    purchaseOrderId: { type: String, required: false, default: null },
};

export const DefaultInvoiceSchema: Schema = new Schema(SchemaBaseInvoice);
DefaultInvoiceSchema.pre("save", function (next) {
    console.log("jljljlkjljljlj");
    let taxPercent = 1 + (this.get("taxPercent") / 100);
    let total = this.get("quantity") * this.get("price") * taxPercent;
    let taxAmount = total - (this.get("quantity") * this.get("price"));

    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())
    this.set("total", total);
    this.set("totalFreeTax", total - taxAmount);
    this.set("taxAmount", taxAmount);

    next();
});

