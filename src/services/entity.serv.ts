import { ApplicationSetting } from './../config/config';
import Entity, { IEntity } from "./../models/entity/entity"

export class EntityService {

    public async getByUser(login: string): Promise<IEntity[]|null> {
        let back: IEntity[] | null = await Entity.find({"users.email": login}).select("id name");
        return back;
    }

    public async get(id: string): Promise<IEntity | null> {
        let back: IEntity | null = await Entity.findOne({ _id: id });
        return back;
    }

    public async update(id: string, entity: { name: string, updatedBy: string }): Promise<IEntity | null> {
        let back: IEntity | null = await Entity.updateOne({ _id: id }, { name: entity.name, updatedBy: entity.updatedBy });
        return back;
    }
}