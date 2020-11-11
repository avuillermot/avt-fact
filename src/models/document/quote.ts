import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultQuoteSchema } from "../schema.document.base";
import { ISalesReceipt } from "../document/salesReceipt";
import { IStatus } from "../document/status";
import { IEntity } from "../entity/entity"
import { ICustomer } from "../entity/customer"
import { IProduct } from "../entity/product";

export interface IQuote extends IBase {
    entityId: string,
    fileName: string;
    date: Date;
    expirationDate: Date;
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
}

export default model<IQuote>('Quote', DefaultQuoteSchema);
