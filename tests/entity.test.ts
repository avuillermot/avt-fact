import { expect } from 'chai';
import "mocha";
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { EntityService } from '../src/controllers/entity.serv';
import { IEntity } from '../src/models/entity/entity';

describe('Entity', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("entities");

    it('Should create an entity', async () => {

        let params: IEntity = <IEntity>{
            name: "AVT Corp.", city: "Dijon", address1: "7 imp Heni L.", address2: "-", address3: "-",
            country: "FRANCE", email: "test@hotmail.com", id1: "s1111", id2: "s22222", id3: "s33333",
            phone: "0380564789", zipCode: "21000"
        };
        let query: EntityService = new EntityService();
        const entity = await query.create(params);
    });
});