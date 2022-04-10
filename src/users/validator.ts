import * as Joi from "joi";

export const validateLogin = async (req: any, res: any, next: any) => {
    const schema = Joi.object({
        emailId: Joi.string().required(),
        password: Joi.string().required()
    })
    try {
        await schema.validateAsync(req.body);
        next();
    }
    catch (err) { return res.send(err) }
}

