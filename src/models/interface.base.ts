import { Document } from "mongoose";

export interface IBase extends Document {
    _id: string,
    createdBy: string,
    created: Date,
    updated: Date,
    updatedBy: string;
    deleted: boolean;
    status: string;
}

export interface IDocument extends IBase {
    html: string;
}