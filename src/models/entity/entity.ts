 import { model, Schema } from "mongoose";
import { IBase } from "../interface.base";
import { DefaultRoleSchema, IRoles } from './role';
import { HookHelper } from "../hook.helper";

const SchEntity = {
    created: { type: Date, required: true, default: null },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: null },
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

const _DefaultEntitySchema: Schema = new Schema(SchEntity);
_DefaultEntitySchema.pre("validate", function (next) {
    HookHelper.onValidate(this);
    if (this.get("users").length == 0) this.get("users").push({ email: this.get("email"), role: "ADMIN" });
    next();
});
_DefaultEntitySchema.pre("updateOne", function (next) {
    HookHelper.onUpdateOne(this["_update"]);
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
    users: IRoles[];
}

export const DefaultEntitySchema = _DefaultEntitySchema;
export default model<IEntity>('Entity', DefaultEntitySchema);