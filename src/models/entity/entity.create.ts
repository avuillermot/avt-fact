import moment = require("moment");
import { Schema, model } from "mongoose";
import { IBase } from "../interface.base";
import { DefaultRoleSchema, IRoles  } from './role';

const SchEntityCreate = {
    created: { type: Date, required: true, default: null },
    createdBy: { type: String, required: true, default: "create_process" },
    updated: { type: Date, required: true, default: null },
    updatedBy: { type: String, required: true, default: "create_process" },

    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    users: { type: [DefaultRoleSchema], required: true, default: [] }
};

export const DefaultEntityCreateSchema: Schema = new Schema(SchEntityCreate);
DefaultEntityCreateSchema.pre("validate", function (next) {
    if (this.get("created") == null) this.set("created", moment().utc());
    this.set("updated", moment().utc());

    if (this.get("users").length == 0) this.get("users").push({ email: this.get("email"), role: "ADMIN" });
    next();
});


export interface IEntityCreate extends IBase {
    name: string;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    email: string;
    users: IRoles[];
}
export default model<IEntityCreate>('EntityCreate', DefaultEntityCreateSchema);