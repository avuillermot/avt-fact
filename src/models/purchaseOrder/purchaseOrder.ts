import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultPurchaseOrderSchema } from "../schema.document.base";
import { IItemInvoice } from "../invoice/itemInvoice";
import { IStatusInvoice } from "../invoice/statusInvoice";

export interface IPurchaseOrder extends IBase {
    entityId: string;
    fileName: string;
    invoiceDate: Date;
    expirationDate: Date;
    invoiceNumber: string;
    customerId: string;
    customerName: string;
    customerAddress1: string;
    customerAddress2: string;
    customerAddress3: string;
    customerZipCode: string;
    customerCity: string;
    customerCountry: string;
    invoiceAddress1: string;
    invoiceAddress2: string;
    invoiceAddress3: string;
    invoiceZipCode: string;
    invoiceCity: string;
    invoiceCountry: string;
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
    items: IItemInvoice[];
    status: string;
    statusHistory: IStatusInvoice[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
}

export default model<IPurchaseOrder>('PurchaseOrder', DefaultPurchaseOrderSchema);
