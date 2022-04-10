import * as jwt from 'jsonwebtoken'
import * as i18n from 'i18n';
import { UserModel } from '../users/model';

const tokenExpiry: number = 361440; // Note: in seconds (1 day)
const securityToken: string = 'contacts-admin';

export const isUserExists = async () => {
    try {
        const fetchUser = await UserModel.find().lean()
        if (!fetchUser.length) {
            // Creating a new test user 
            const newUser = await UserModel.create({
                emailId: 'contact.user@grr.la',
                password: 'Test@123',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin'
            })
            if (newUser) {
                const getToken = await generateToken(newUser._id)
                await UserModel.findByIdAndUpdate(newUser._id, { $set: { token: getToken } })
            }
        }
        return;
    } catch (e) {
        console.error('error in creating a new user ', e)
    }
}

export const isAuthorised = (req: any, res: any, next: any) => {
    const token = req.headers.authorization;
    if (!token) { return res.status(401).json({ status: 0, message: i18n.__("TOKEN_WITH_API") }) };
    next();
}

export const generateToken = async (id: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = jwt.sign({
                id: id,
                algorithm: "HS256",
                exp: Math.floor(Date.now() / 1000) + tokenExpiry
            }, securityToken);

            return resolve(token);
        } catch (err) {
            console.log("Get token", err);
            return reject({ message: err, status: 0 });
        }

    });
}