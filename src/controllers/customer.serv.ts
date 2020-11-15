import Customer, { ICustomer } from "./../models/entity/customer"
export class CustomerService {

    public async create(customer: ICustomer): Promise<ICustomer> {
        let back: ICustomer = await Customer.create(customer);
        return back;
    }

    public async get(entity: string): Promise<ICustomer[]> {
        let customers = await Customer.find({ entityId: entity });
        return customers;
    }
}