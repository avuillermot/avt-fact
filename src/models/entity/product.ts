import { model } from "mongoose";
import { IBase } from "./../interface.base";
import { DefaultProductSchema } from "../schema.product";

export interface IProduct extends IBase {
    entityId: string;
    productCode: string;
    productName: string;
    price: number;
    taxPercent: number;
}

export default model<IProduct>('Product', DefaultProductSchema);