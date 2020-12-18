import Entity, { IEntity } from "./../models/entity/entity"
export class EntityService {

    public async create(entity: IEntity): Promise<IEntity> {
        let back: IEntity = await Entity.create(entity);
        return back;
    }

    public async getByUser(login: string): Promise<IEntity[]|null> {
        let back: IEntity[] | null = await Entity.find({ users: login }).select("id name");
        return back;
    }

    public async get(id: string): Promise<IEntity | null> {
        let back: IEntity | null = await Entity.findOne({ _id: id });
        return back;
    }
}