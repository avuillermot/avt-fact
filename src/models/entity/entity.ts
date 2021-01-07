import { model, Schema } from "mongoose";
import moment = require("moment");
import { IBase } from "../interface.base";

const SchRole = {
    email: { type: String, required: true },
    role: { type: String, required: true }
};
const DefaultRoleSchema: Schema = new Schema(SchRole);

const SchEntity = {
    created: { type: Date, required: true, default: moment().utc() },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: moment().utc() },
    updatedBy: { type: String, required: true, default: "create_process" },

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
    users: { type: [DefaultRoleSchema], required: true, default: [] }
};

export const DefaultEntitySchema: Schema = new Schema(SchEntity);
DefaultEntitySchema.pre("save", function (next) {
    this.set("created", moment().utc().toDate());
    this.set("updated", moment().utc().toDate())

    let users: IRoles[] = new Array<IRoles>();
    this.get("users").push({ email: this.get("email"), role: "ADMIN" });
    next();
});

export interface IRoles {
    email: string;
    role: string;
}
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
    users: IRoles[];
}

export default model<IEntity>('Entity', DefaultEntitySchema);