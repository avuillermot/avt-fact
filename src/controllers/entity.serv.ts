import Entity, { IEntity } from "./../models/entity/entity"
export class EntityService {

    public async create(entity: IEntity): Promise<IEntity> {
        let back: IEntity = await Entity.create(entity);
        return back;
    }
}