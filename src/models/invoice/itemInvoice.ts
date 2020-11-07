import { model } from "mongoose";
import moment = require("moment");
import { IBase, DefaultItemInvoiceSchema } from "../schema-base";

export interface IItemInvoice extends IBase {
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