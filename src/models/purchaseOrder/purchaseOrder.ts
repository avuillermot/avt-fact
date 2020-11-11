import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultPurchaseOrderSchema } from "../schema.document.base";
import { IProduct } from "../entity/product";
import { IStatus } from "../document/status";

export interface IPurchaseOrder extends IBase {
    entityId: string;
    fileName: string;
    date: Date;
    expirationDate: Date;
    number: string;
    customerId: string;
    customerName: string;
    customerAddress1: string;
    customerAddress2: string;
    customerAddress3: string;
    customerZipCode: string;
    customerCity: string;
    customerCountry: string;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    providerId1: string;
    providerId2: string;
    providerId3: string;
    providerName: string;
    providerAddress1: string;
    providerAddress2: string;
    providerAddress3: string;
    providerZipCode: string;
    providerCity: string;
    providerCountry: string;
    providerEmail: string;
    providerPhone: string;
    items: IProduct[];
    status: string;
    statusHistory: IStatus[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
}

export default model<IPurchaseOrder>('PurchaseOrder', DefaultPurchaseOrderSchema);
