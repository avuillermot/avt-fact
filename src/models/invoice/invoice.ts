import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultInvoiceSchema } from "../schema.document.base";
import { IItemInvoice } from "./itemInvoice";
import { IStatusInvoice } from "./statusInvoice";
import { IEntity } from "../entity/entity";
import { ICustomer } from "../entity/customer";

export interface IInvoice extends IBase {
    entityId: string;
    fileName: string;
    invoiceDate: Date;
    deliveryDate: Date;
    paymentDate: Date;
    invoiceNumber: string;
    customer: ICustomer;
    invoiceAddress1: string;
    invoiceAddress2: string;
    invoiceAddress3: string;
    invoiceZipCode: string;
    invoiceCity: string;
    invoiceCountry: string;
    seller: IEntity;
    items: IItemInvoice[];
    status: string;
    statusHistory: IStatusInvoice[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
    quoteId: string;
}

export default model<IInvoice>('Invoice', DefaultInvoiceSchema);