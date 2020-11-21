import Product, { IProduct } from "./../models/entity/product"
export class ProductService {

    public async create(product: IProduct): Promise<IProduct> {
        let back: IProduct = await Product.create(product);
        return back;
    }

    public async getAll(entity: string): Promise<IProduct[]> {
        let products: IProduct[];
        products = await Product.find({ entityId: entity });
        return products;
    }

    public async get(entity: string, id: string): Promise<IProduct> {
        let product: IProduct;
        product = <IProduct>await Product.findOne({ entityId: entity, _id: id });
        return product;
    }

    public async startWith(entity: string, start: string): Promise<IProduct[]> {
        let products: IProduct[];
        products = <IProduct[]>await Product.find({ entityId: entity, name: new RegExp("^" + start.toLowerCase(), "i") });
        return products;
    }

    public async update(product: IProduct): Promise<IProduct> {
        try {
            let result: IProduct = await Product.updateOne({ _id: product._id, entityId: product.entityId }, product, { runValidators: true });
            return result;
        }
        catch (ex) {
            let err: string = JSON.stringify(ex.errors);
            throw new Error(err);
        }
    }
}