import { ApplicationServiceConfig } from './../config/config';
import Entity, { IEntity } from "./../models/entity/entity"
import axios from 'axios';
import https from 'https';

export class EntityService {

    public async create(entity: IEntity, owner: { firstName: string, lastName: string, email: string, emailConfirmed: boolean, phone: string, password: string, confirmPassword: string} = null): Promise<IEntity> {
        let back: IEntity = await Entity.create(entity);
        if (owner != null) {
            const instance = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            let response: any = null;
            try {
                response = await instance.post(ApplicationServiceConfig.urlUserService, owner);
            }
            catch (ex) {
                console.log("Delete entity on error : " + back._id);
                await Entity.deleteOne({ _id: back._id });
                throw new Error(ex.response.data);
            }
        }
        return back;
    }

    public async getByUser(login: string): Promise<IEntity[]|null> {
        let back: IEntity[] | null = await Entity.find({"users.email": login}).select("id name");
        return back;
    }

    public async get(id: string): Promise<IEntity | null> {
        let back: IEntity | null = await Entity.findOne({ _id: id });
        return back;
    }
}