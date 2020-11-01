import { Document } from "mongoose";

export interface IBase extends Document {
    createdBy: string,
    created: Date,
    updated: Date,
    updatedBy: string
}
