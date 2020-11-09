import { model } from "mongoose";
import { IBase, DefaultStatusInvoiceSchema } from "../schema.document.base";

export interface IStatusInvoice extends IBase {
    status: string;
}

export default model<IStatusInvoice>('IStatusInvoice', DefaultStatusInvoiceSchema);