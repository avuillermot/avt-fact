import { model, Schema } from "mongoose";
import moment = require("moment");
import { IBase } from "../interface.base";

const SchEntity = {
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
    users: { type: [String], required: true, default: [] }
};

export const DefaultEntitySchema: Schema = new Schema(SchEntity);
DefaultEntitySchema.pre("save", function (next) {
    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())

    let users: string[] = this.get("user");
    if (users == undefined || users == null) users = new Array<string>();
    users.push(this.get("email"));
    this.set("users", users);
    next();
});

export interface IEntity extends IBase {
    name: string;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    siren: string;
    siret: string;
    codeAPE: string;
    codeTVA: string;
    legalType: string;
    capital: number;
    users: string[];
}

export default model<IEntity>('Entity', DefaultEntitySchema);