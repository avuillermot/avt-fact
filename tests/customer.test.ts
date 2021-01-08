import { expect } from 'chai';
import "mocha";
import { ApplicationDbSettings as DbSettings, ApplicationSetting } from "./../src/config/config";
import { CustomerService } from '../src/services/customer.serv';
import { ICustomer } from '../src/models/entity/customer';

describe('Customer', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    
    it('Should create an a customer', async () => {

        let params: ICustomer = <ICustomer>{
            lastName: "Eponge", firstName:"Bob", city: "Lyon", address1: "1 place de la République", address2: "-", address3: "-",
            country: "FRANCE", email: "bob@hotmail.com", 
            phone: "0380564789", zipCode: "21000", entityId: "ENTTEST"
        };
        let query: CustomerService = new CustomerService();
        const customer = await query.create(params);
        expect(customer.created).not.equal(null, "created must be not null");
        expect(customer.updated).not.equal(null, "updated must be not null");
        expect(customer.createdBy).equal("create_process", "createdBy must be create_process");
        expect(customer.updatedBy).equal("create_process", "updatedBy must be not create_process");
        expect(customer.deleted).equal(false, "should not be deleted");
    });
});