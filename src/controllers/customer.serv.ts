import Customer, { ICustomer } from "./../models/entity/customer"
export class CustomerService {

    public async create(customer: ICustomer): Promise<ICustomer> {
        let back: ICustomer = await Customer.create(customer);
        return back;
    }
}