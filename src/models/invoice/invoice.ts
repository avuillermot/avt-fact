import { model } from "mongoose";
import { IBase, DefaultInvoiceSchema } from "../schema.document.base";
import { IItemInvoice } from "./itemInvoice";
import { IStatusInvoice } from "./statusInvoice";

export interface IInvoice extends IBase {
    fileName: string;
    invoiceDate: Date;
    deliveryDate: Date;
    paymentDate: Date;
    invoiceNumber: string;
    customerLabel: string;
    customerId: string;
    customerName: string;
    customerAddress1: string;
    customerAddress2: string;
    customerAddress3: string;
    customerZipCode: string;
    customerCity: string;
    customerCountry: string;
    invoiceLabel: string;
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
    quoteId: string;
}

export default model<IInvoice>('Invoice', DefaultInvoiceSchema);