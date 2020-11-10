import mongoose, { Schema, Document } from "mongoose";
import moment = require("moment");
import { DefaultEntitySchema } from "./schema.entity";
var Float = require('mongoose-float').loadType(mongoose, 2);

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
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_process" },

    productCode: { type: String, required: true, default: "NO_CODE" },
    productName: { type: String, required: true, default: "(?)" },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Float, required: true, default: 0 },
    total: { type: Float, required: true, default: 0 },
    totalFreeTax: { type: Number, required: true, default: 0 },
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

const SchemaBaseDocument = {
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_process" },

    invoiceDate: { type: Date, required: true },
    fileName: { type: String, required: false },
    invoiceNumber: { type: String, required: true },

    customerId: { type: String, required: true },
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

    seller: { type: DefaultEntitySchema, required: true },

    status: { type: String, required: true, default: "CREATE" },
    statusHistory: { type: [DefaultStatusInvoiceSchema] },

    items: { type: [DefaultItemInvoiceSchema] },
    total: { type: Float, required: true, default: 0 },
    totalFreeTax: { type: Float, required: true, default: 0 },
    taxAmount: { type: Float, required: true, default: 0 }    
};

const _DefaultInvoiceSchema: Schema = new Schema(SchemaBaseDocument);
_DefaultInvoiceSchema.add({
    entityId: { type: String, required: true },
    quoteId: { type: String, required: false}
});
_DefaultInvoiceSchema.pre("save", function (next) {
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
export const DefaultInvoiceSchema = _DefaultInvoiceSchema

const _DefaultQuoteSchema: Schema = new Schema(SchemaBaseDocument);
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
export const DefaultQuoteSchema = _DefaultQuoteSchema


const _DefaultPurchaseOrderSchema: Schema = new Schema(SchemaBaseDocument);
_DefaultPurchaseOrderSchema.add({
    entityId: { type: String, required: true },
    expirationDate: { type: Date, required: true, default: moment().utc().add(30, "days").toDate() }
});
_DefaultPurchaseOrderSchema.pre("save", function (next) {
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
export const DefaultPurchaseOrderSchema = _DefaultPurchaseOrderSchema
