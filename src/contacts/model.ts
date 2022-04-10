import { Schema } from "mongoose";
import { model } from "mongoose";
import { Contact } from "./interface";
import { ContactEnum } from '../utils/constants'
const ContactsSchema = new Schema({
    name: String,
    contactType: { type: String, enum: ContactEnum },
    isDeleted: { type: Boolean, default: false }
},
    { timestamps: true });
export const ContactModel = model<Contact>("contacts", ContactsSchema);
