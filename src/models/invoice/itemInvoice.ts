import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultItemInvoiceSchema } from "../schema.document.base";

export interface IItemInvoice extends IBase {
    entityId: string;
    productCode: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    totalFreeTax: number;
    taxAmount: number;
    taxPercent: number;
}

export default model<IItemInvoice>('ItemInvoice', DefaultItemInvoiceSchema);