import { model } from "mongoose";
import { DefaultStatusInvoiceSchema } from "../schema.document.base";
import { IBase } from "./../interface.base";

export interface IStatusInvoice extends IBase {
    status: string;
}

export default model<IStatusInvoice>('IStatusInvoice', DefaultStatusInvoiceSchema);