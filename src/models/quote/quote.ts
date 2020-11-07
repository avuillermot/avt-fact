import mongoose, { Schema, model } from "mongoose";
import { IBase, SchemaBaseInvoice } from "../model-base";
import { IInvoice } from "./../invoice/invoice";

export interface IQuote extends IInvoice {

}

export const DefaultQuote: Schema = new Schema(SchemaBaseInvoice);