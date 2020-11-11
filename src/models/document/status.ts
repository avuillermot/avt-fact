import { model } from "mongoose";
import { DefaultStatusSchema } from "../schema.document.base";
import { IBase } from "./../interface.base";

export interface IStatus extends IBase {
    status: string;
}

export default model<IStatus>('IStatus', DefaultStatusSchema);