import { ContactModel } from './model'
import * as i18n from 'i18n';
import { ContactListReq } from "./interface";

export const createContact = (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contactDetails = await ContactModel.findOne({ name: req.body.name, contactType: req.body.type, isDeleted: false }).exec();
            contactDetails = JSON.parse(JSON.stringify(contactDetails))
            if (contactDetails) { return resolve({ status: 0, message: i18n.__('CONTACT_ALREADY_EXISTS'), data: { contactDetails } }) }
            else {
                contactDetails = await ContactModel.create({ name: req.body.name, contactType: req.body.type })
                return resolve({ status: 1, message: i18n.__('CONTACT_CREATED'), data: { contactDetails } })
            }
        } catch (e) {
            return reject(e)
        }
    })
}

export const getContact = (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contactDetails = await ContactModel.findOne({ _id: req.params.id, isDeleted: false }).exec();
            if (!contactDetails) { return resolve({ status: 0, message: i18n.__('CONTACT_NOT_EXISTS'), data: {} }) }
            return resolve({ status: 1, message: i18n.__('CONTACT_DETAILS'), data: { contactDetails } })
        }
        catch (e) {
            return reject(e)
        }
    })
}

export const updateContact = (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contactDetails = await ContactModel.findOne({ _id: { $ne: req.params.id }, name: req.body.name, contactType: req.body.type, isDeleted: false }).exec();
            contactDetails = JSON.parse(JSON.stringify(contactDetails))
            if (contactDetails) { return resolve({ status: 0, message: i18n.__('CONTACT_ALREADY_EXISTS'), data: { contactDetails } }) }
            else {
                contactDetails = await ContactModel.findByIdAndUpdate(req.params.id,
                    { $set: { name: req.body.name, contactType: req.body.type } }).exec();
                return resolve({ status: 1, message: i18n.__('CONTACT_UPDATED'), data: { contactDetails } })
            }
        } catch (e) {
            return reject(e)
        }
    })
}

export const deleteContact = (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {   // Hard Delete
            await ContactModel.findByIdAndDelete(req.params.id, { $set: { isDeleted: true } }).exec();
            return resolve({ status: 1, message: i18n.__('CONTACT_DELETED'), data: {} })
        } catch (e) {
            return reject(e)
        }
    })
}

export const getContactsList = (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filterObj: ContactListReq = { isDeleted: false }
            const sortBy = req.body.sortBy ? req.body.sortBy : { updatedAt: -1 }
            if (req.body.type) { filterObj['contactType'] = req.body.type }
            const contactsList = await ContactModel.find(filterObj)
                .skip((req.body.page - 1) * req.body.pageSize)
                .limit(req.body.pageSize)
                .sort(sortBy)
                .exec();
            return resolve({ status: 1, message: i18n.__('CONTACT_LIST'), data: { contactsList } })
        }
        catch (e) {
            return reject(e)
        }
    })
}
