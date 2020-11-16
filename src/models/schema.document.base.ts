import mongoose, { Schema, Document } from "mongoose";
import moment = require("moment");
import { DefaultEntitySchema } from "./schema.entity";
import { DefaultCustomerSchema } from "./schema.entity";
import { DefaultItemLineSchema } from "./schema.itemLine";
var Float = require('mongoose-float').loadType(mongoose, 2);

const SchemaBaseStatus: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "system" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "system" },

    status: { type: String, required: true },

});
export const DefaultStatusSchema: Schema = new Schema(SchemaBaseStatus);

const SchemaBaseDocument = {
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_process" },

    date: { type: Date, required: true },
    fileName: { type: String, required: false },
    number: { type: String, required: true, unique: true },

    customer: { type: DefaultCustomerSchema, required: true },

    address1: { type: String, required: true },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

    seller: { type: DefaultEntitySchema, required: true },

    status: { type: String, required: true, default: "CREATE" },
    statusHistory: { type: [DefaultStatusSchema] },

    items: { type: [DefaultItemLineSchema] },
    total: { type: Float, required: true, default: 0 },
    totalFreeTax: { type: Float, required: true, default: 0 },
    taxAmount: { type: Float, required: true, default: 0 }    
};

const _DefaultSalesReceiptSchema: Schema = new Schema(SchemaBaseDocument);
_DefaultSalesReceiptSchema.add({
    entityId: { type: String, required: true },
    quoteId: { type: String, required: false },
    purchaseOrderId: { type: String, required: false }
});
_DefaultSalesReceiptSchema.pre("save", function (next) {
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
export const DefaultSalesReceiptSchema = _DefaultSalesReceiptSchema

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
    quoteId: { type: String, required: false },
    deliveryDate: { type: Date, required: true, default: moment().utc().add(30, "days").toDate() }
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
