import { Schema } from "mongoose";
import { model } from "mongoose";
import { User } from "./interface";

const UsersSchema = new Schema({
    emailId: String,
    token: String,
    firstName: String,
    lastName: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'] },
    isDeleted: { type: Boolean, default: false }
},
    { timestamps: true });

export const UserModel = model<User>("users", UsersSchema);
