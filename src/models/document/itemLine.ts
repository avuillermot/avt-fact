import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultItemLineSchema } from "../schema.itemLine";

export interface IItemLine extends IBase {
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

export default model<IItemLine>('IItemLine', DefaultItemLineSchema);