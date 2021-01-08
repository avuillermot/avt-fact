import { expect } from 'chai';
import "mocha";
import { ApplicationDbSettings as DbSettings, ApplicationSetting } from "./../src/config/config";
import { EntityService } from '../src/services/entity.serv';                                                                                                                                              
import { IEntity } from '../src/models/entity/entity';

describe('Entity', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("entities");

    let email: string = "bwillis@hotmail.com";
    
    it('Should create an entity', async () => {
        
        let params: IEntity = <IEntity>{
            name: "AVT Corp.", city: "Dijon", address1: "7 imp Heni L.", address2: "-", address3: "-",
            country: "FRANCE", email: email, phone: "0380564789", zipCode: "21000",
            siren: "424 430 015 00026",
            siret: "424 430 015 00026 001",
            codeAPE: "4322B",
            codeTVA: "IT1235",
            legalType: "SARL",
            capital: 8000,
        };
        let query: EntityService = new EntityService();
        const entity = await query.create(params, { firstName: "Bruce", lastName: "Willis", email: email, emailConfirmed: false, phone: "+330123456" });
        expect(entity.users.length).equal(1, "One role ADMIN must be present");
        expect(entity.users[0].role).equal("ADMIN", "Must be ADMIN");
        expect(entity.email).equal(email, "Bad email for entity");
        expect(entity.email).equal(entity.users[0].email, "Bad email for role");
        expect(entity._id).not.equal(null, "id ne peu pas etre null");
        expect(entity.created).not.equal(null, "created must be not null");
        expect(entity.updated).not.equal(null, "updated must be not null");
        expect(entity.createdBy).equal("create_process", "createdBy must be system");
        expect(entity.updatedBy).equal("create_process", "updatedBy must be not system");
    });

    it('Should find an account', async () => {
        let query: EntityService = new EntityService();
        let entities: IEntity[] = await query.getByUser(email);
        expect(entities.length).equal(1, "Must find an entity");
    });
});