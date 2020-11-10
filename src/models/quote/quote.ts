import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultQuoteSchema } from "../schema.document.base";
import { IItemInvoice } from "../invoice/itemInvoice";
import { IStatusInvoice } from "../invoice/statusInvoice";
import { IEntity } from "../entity/entity"

export interface IQuote extends IBase {
    entityId: string,
    fileName: string;
    invoiceDate: Date;
    expirationDate: Date;
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
    seller: IEntity;
    items: IItemInvoice[];
    status: string;
    statusHistory: IStatusInvoice[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
}

export default model<IQuote>('Quote', DefaultQuoteSchema);
