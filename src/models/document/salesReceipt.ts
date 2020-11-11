import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultSalesReceiptSchema } from "../schema.document.base";
import { IProduct } from "./../entity/product";
import { IStatus } from "./status";
import { IEntity } from "../entity/entity";
import { ICustomer } from "../entity/customer";

export interface ISalesReceipt extends IBase {
    entityId: string;
    fileName: string;
    date: Date;
    deliveryDate: Date;
    paymentDate: Date;
    number: string;
    customer: ICustomer;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    seller: IEntity;
    items: IProduct[];
    status: string;
    statusHistory: IStatus[];
    total: number;
    totalFreeTax: number;
    taxAmount: number;
    quoteId: string;
}

export default model<ISalesReceipt>('SalesReceipt', DefaultSalesReceiptSchema);