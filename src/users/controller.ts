import { UserModel } from './model';
import * as i18n from 'i18n';
import * as Authentication from '../configs/authentication'

export const login = (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isNewUser: boolean = false
            let userDetails = await UserModel.findOne({ emailId: req.body.emailId, password: req.body.password, isDeleted: false }).exec();
            userDetails = JSON.parse(JSON.stringify(userDetails));
            if (!userDetails) {
                isNewUser = true
                userDetails = await UserModel.create({ emailId: req.body.emailId, password: req.body.password, role: 'user' })
            }
            const newToken = await Authentication.generateToken(userDetails._id)
            await UserModel.findByIdAndUpdate(userDetails._id, { $set: { token: newToken } })
            return resolve({
                status: 1,
                message: isNewUser ? i18n.__('USER_CREATED_AND_LOGGED_IN') : i18n.__('LOGIN_SUCCESS'),
                data: { token: newToken, userDetails }
            })
        } catch (e) {
            return reject(e)
        }
    })
}