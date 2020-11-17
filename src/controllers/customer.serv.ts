import Customer, { ICustomer } from "./../models/entity/customer"
export class CustomerService {

    public async create(customer: ICustomer): Promise<ICustomer> {
        let back: ICustomer = await Customer.create(customer);
        return back;
    }

    public async getAll(entity: string): Promise<ICustomer[]> {
        let customers: ICustomer[];
        customers = await Customer.find({ entityId: entity });
        return customers;
    }

    public async get(entity: string, id: string): Promise<ICustomer> {
        let customer: ICustomer;
        customer = <ICustomer> await Customer.findOne({ entityId: entity, _id: id });
        return customer;
    }

    public async update(customer: ICustomer): Promise<ICustomer> {
        try {
            let result: ICustomer = await Customer.updateOne({ _id: customer._id, entityId: customer.entityId }, customer, { runValidators: true });
            return result;
        }
        catch (ex) {
            let err: string = JSON.stringify(ex.errors);
            throw new Error(err);
        }
    }
}