import { model } from "mongoose";
import { DefaultEntitySchema } from "../schema.entity";
import { IBase } from "../interface.base";

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
}

export default model<IEntity>('Entity', DefaultEntitySchema);