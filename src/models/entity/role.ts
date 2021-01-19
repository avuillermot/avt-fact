import { model, Schema, Document } from "mongoose";

const SchRole = {
    email: { type: String, required: true },
    role: { type: String, required: true }
};
export interface IRoles extends Document {
    _id: string,
    email: string;
    role: string;
}
export const DefaultRoleSchema: Schema = new Schema(SchRole);
export default model<IRoles>('Roles', DefaultRoleSchema);
