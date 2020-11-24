import jwt from 'jsonwebtoken';
import moment = require('moment');
import { IToken } from '../models/token';

export class Secure {
    public static async decrypt (token: string|undefined): Promise<IToken> {

        if (token != null && token != undefined) {
            token = token.replace("Bearer ", "");
        }
        else throw new Error("Auth token undefined");

        let decrypt: IToken = <IToken>jwt.verify(token, "PERRIGNY21160");

        return decrypt;
    }

    public static async authenticate(req: any, res: any, next: any): Promise<void> {

        let token:IToken;
        if (req.headers.authorization != null && req.headers.authorization != undefined) {
            token = await Secure.decrypt(req.headers.authorization);

            if (moment(token.expire).toDate() < moment().utc().toDate()) {
                res.redirect(401, '/login');
            }
            else next();
        }
        else res.redirect(401, 'http://www.lemonde.fr');
    }
}