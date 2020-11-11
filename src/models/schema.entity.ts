import { Schema } from "mongoose";
import moment = require("moment");

const SchemaEntity: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "system" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "system" },

    name: { type: String, required: true },
    siren: { type: String, required: true },
    siret: { type: String, required: true },
    codeAPE: { type: String, required: true },
    codeTVA: { type: String, required: true },
    legalType: { type: String, required: true },
    capital: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});
export const DefaultEntitySchema: Schema = new Schema(SchemaEntity);

const SchemaCustomer: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "system" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "system" },

    entityId: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }

});
export const DefaultCustomerSchema: Schema = new Schema(SchemaCustomer);