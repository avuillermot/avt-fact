import { Schema } from "mongoose";
import moment = require("moment");

const SchemaEntity: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "system" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "system" },

    name: { type: String, required: true },
    id1: { type: String, required: true },
    id2: { type: String, required: false },
    id3: { type: String, required: false },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }

});
export const DefaultEntitySchema: Schema = new Schema(SchemaEntity);