import { model } from "mongoose";
import { DefaultCustomerSchema } from "../schema.entity";
import { IBase } from "../interface.base";

export interface ICustomer extends IBase {
    entityId: string;
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