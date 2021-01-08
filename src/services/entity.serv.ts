import { ApplicationServiceConfig } from './../config/config';
import Entity, { IEntity } from "./../models/entity/entity"
export class EntityService {

    public async create(entity: IEntity, owner: any = null): Promise<IEntity> {
        let back: IEntity = await Entity.create(entity);
        if (owner != null) {
            console.log(ApplicationServiceConfig.urlUserService);
        }
        console.log(owner);
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