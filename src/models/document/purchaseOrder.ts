import { model } from "mongoose";
import { IDocument } from "./../interface.base";
import { IEntity } from "../entity/entity"
import { DefaultPurchaseOrderSchema } from "../schema.document.base";
import { IItemLine } from "./itemLine";
import { IStatus } from "../document/status";
import { ICustomer } from "../entity/customer"

export interface IPurchaseOrder extends IDocument {
    entityId: string;
    fileName: string;
    date: Date;
    deliveryDate: Date;
    number: string;
    customer: ICustomer;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    seller: IEntity;
    items: IItemLine[];
    status: string;
    statusHistory: IStatus[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
    quoteId: string;
}

export default model<IPurchaseOrder>('PurchaseOrder', DefaultPurchaseOrderSchema);
