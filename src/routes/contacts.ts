import { Router } from 'express';
import * as Contacts from '../contacts/controller'
import * as Validators from '../contacts/validator'
import * as Authentication from '../configs/authentication'

const contactRouter = Router();

contactRouter.post('/contact', Authentication.isAuthorised, Validators.validatePostContact, async (req, res) => {
    const responseObj = await Contacts.createContact(req, res);
    return res.send(responseObj);
});
contactRouter.get('/:id', Authentication.isAuthorised, Validators.validateContactId, async (req, res) => {
    const responseObj = await Contacts.getContact(req, res);
    return res.send(responseObj);
});
contactRouter.put('/:id', Authentication.isAuthorised, Validators.validateUpdateContact, async (req, res) => {
    const responseObj = await Contacts.updateContact(req, res);
    return res.send(responseObj);
});
contactRouter.delete('/:id', Authentication.isAuthorised, Validators.validateContactId, async (req, res) => {
    const responseObj = await Contacts.deleteContact(req, res);
    return res.send(responseObj);
});
contactRouter.post('/', Authentication.isAuthorised, Validators.validateListContacts, async (req, res) => {
    const responseObj = await Contacts.getContactsList(req, res);
    return res.send(responseObj)
});


export default contactRouter;