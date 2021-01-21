import { ApplicationSetting } from './../config/config';
import moment = require("moment");
import Entity, { IEntity } from "./../models/entity/entity";
import EntityCreate, { IEntityCreate } from "./../models/entity/entity.create";
import axios from 'axios';
import https from 'https';

export class EntityCreateService {

    public async create(entity: IEntity, owner: { firstName: string, lastName: string, email: string, emailConfirmed: boolean, phone: string, password: string, confirmPassword: string } = null): Promise<IEntity> {

        let back: IEntity = await Entity.create(entity);
        if (owner != null) {
            const instance = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            let response: any = null;
            try {
                response = await instance.post(ApplicationSetting.urlUserService, owner);
            }
            catch (ex) {
                console.log("Error - Delete entity : " + back._id);
                await Entity.deleteOne({ _id: back._id });
                throw new Error(ex.response.data);
            }
        }
        return back;
    }

    public async createUncomplete(entity: IEntityCreate, owner: { firstName: string, lastName: string, email: string, emailConfirmed: boolean, phone: string, password: string, confirmPassword: string } = null): Promise<IEntityCreate> {
        let back: IEntityCreate = await EntityCreate.create(entity);
        if (owner != null) {
            const instance = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            let response: any = null;
            try {
                response = await instance.post(ApplicationSetting.urlUserService, owner);
            }
            catch (ex) {
                console.log("Error - Delete entity : " + back._id);
                await Entity.deleteOne({ _id: back._id });
                throw new Error(ex.response.data);
            }
        }
        return back;
    }
}