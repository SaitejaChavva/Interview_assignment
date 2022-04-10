import * as Joi from "joi";

export const validatePostContact = async (req: any, res: any, next: any) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required().valid('personnel', 'business')
    })
    try {
        await schema.validateAsync(req.body);
        next();
    }
    catch (err) { return res.send(err) }
}

export const validateContactId = async (req: any, res: any, next: any) => {
    const schema = Joi.object({
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()  //ObjectId Validation
    })
    try {
        await schema.validateAsync(req.params);
        next();
    }
    catch (err) { return res.send(err) }
}

export const validateUpdateContact = async (req: any, res: any, next: any) => {
    const idSchema = Joi.object({
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
    const schema = Joi.object({
        name: Joi.string().alphanum().required(),
        type: Joi.string().required().valid('personnel', 'business')
    })
    try {
        await idSchema.validateAsync(req.params);
        await schema.validateAsync(req.body);
        next();
    }
    catch (err) { return res.send(err) }
}

export const validateListContacts = async (req: any, res: any, next: any) => {
    const schema = Joi.object({
        page: Joi.number().required(),
        pageSize: Joi.number().required(),
        type: Joi.string().valid('personnel', 'business').optional(),
        sortBy: Joi.object({
            name: Joi.number().optional(),
        }).optional(),
    })
    try {
        await schema.validateAsync(req.body);
        next();
    }
    catch (err) { return res.send(err) }
}
