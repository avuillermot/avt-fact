import { model } from "mongoose";
import { DefaultEntitySchema } from "../schema.entity";
import { IBase } from "../interface.base";

export interface IEntity extends IBase {
    id1: string;
    id2: string;
    id3: string;
    name: string;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}

export default model<IEntity>('Entity', DefaultEntitySchema);