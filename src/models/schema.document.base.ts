import mongoose, { Schema, Document } from "mongoose";
import moment = require("moment");
import { DefaultEntitySchema } from "../models/entity/entity";
import { DefaultCustomerSchema } from "../models/entity/customer";
import { DefaultItemLineSchema } from "../models/document/itemLine";
var Float = require('mongoose-float').loadType(mongoose, 2);

export const DefaultStatusSchemaDef = {
    created: { type: Date, required: true, default: null },
    createdBy: { type: String, required: true, default: "system" },
    updated: { type: Date, required: true, default: null },
    updatedBy: { type: String, required: true, default: "system" },

    status: { type: String, required: true },
    deleted: { type: String, required: true, default: false }
};
export const DefaultStatusSchema: Schema = new Schema(DefaultStatusSchemaDef);

export const DefaultBaseDocumentDef = {
    created: { type: Date, required: true, default: null },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: null },
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
    taxAmount: { type: Float, required: true, default: 0 },

    html: { type: String, required: true }
};
export const DefaultBaseDocument = new Schema(DefaultBaseDocumentDef);