import { model } from "mongoose";
import { IBase, DefaultStatusInvoiceSchema } from "../schema-base";

export interface IStatusInvoice extends IBase {
    status: string;
}

export default model<IStatusInvoice>('IStatusInvoice', DefaultStatusInvoiceSchema);