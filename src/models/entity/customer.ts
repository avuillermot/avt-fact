import moment = require("moment");
import { model, Schema } from "mongoose";
import { IBase } from "../interface.base";

const SchemaCustomer: Schema = new Schema({
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "system" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "system" },

    entityId: { type: String, required: true },
    number: { type: Number, required: true },
    lastName: { type: String, required: true, minlength: 1 },
    firstName: { type: String, required: true, minlength: 1 },
    type: {type: String, required: true, default: "PERSON"},
    address1: { type: String, required: true, minlength: 1 },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    zipCode: { type: String, required: true, minlength: 1 },
    city: { type: String, required: true, minlength: 1 },
    country: { type: String, required: true, minlength: 1 },
    email: { type: String, required: true, minlength: 3 },
    phone: { type: String, required: true, minlength: 3 },
    deleted: { type: Boolean, required: true, default: false }

});
export const DefaultCustomerSchema: Schema = new Schema(SchemaCustomer);
DefaultCustomerSchema.pre("save", function (next) {
    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())

    next();
});

export interface ICustomer extends IBase {
    entityId: string;
    number: number;
    lastName: string;
    firstName: string;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}

export default model<ICustomer>('Customer', DefaultCustomerSchema);