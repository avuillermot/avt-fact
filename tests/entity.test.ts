import { expect } from 'chai';
import "mocha";
import { ApplicationDbSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { EntityService } from '../src/services/entity.serv';
import { IEntity } from '../src/models/entity/entity';

describe('Entity', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    
    it('Should create an entity', async () => {

        let params: IEntity = <IEntity>{
            name: "AVT Corp.", city: "Dijon", address1: "7 imp Heni L.", address2: "-", address3: "-",
            country: "FRANCE", email: "test@hotmail.com", phone: "0380564789", zipCode: "21000",
            siren: "424 430 015 00026",
            siret: "424 430 015 00026 001",
            codeAPE: "4322B",
            codeTVA: "IT1235",
            legalType: "SARL",
            capital: 8000,
        };
        let query: EntityService = new EntityService();
        const entity = await query.create(params);
    });
});