import { IEntity } from './entity/entity'
export interface IToken {
    id: string;
    created: Date;
    login: string;
    entities: IEntity[];
    currentEntity: IEntity;
    email: string;
    expire: Date;
    type: string;
    credentials: string[]
}