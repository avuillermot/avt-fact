import moment = require("moment");
import { model, Schema } from "mongoose";
import { IBase } from "../interface.base";

const SchCustomer = {
    created: { type: Date, required: true, default: null },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: null },
    updatedBy: { type: String, required: true, default: "create_process" },

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
};
export const DefaultCustomerSchema: Schema = new Schema(SchCustomer, { toJSON: { virtuals: true } });
DefaultCustomerSchema.virtual('fullName').get(function (this: { firstName: string, lastName: string }) {
    return this.firstName + " " + this.lastName;
});
DefaultCustomerSchema.pre("validate", function (next) {
    if (this.get("created") == null) this.set("created", moment().utc());
    this.set("updated", moment().utc().toDate());

    next();
});

export interface ICustomer extends IBase {
    entityId: string;
    number: number;
    lastName: string;
    firstName: string;
    fullName: string;
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