import { expect } from 'chai';
import "mocha";
import { ApplicationDbTestSettings as DbSettings } from "./../src/config";
import { ProductService } from '../src/services/product.serv';
import { IProduct } from '../src/models/entity/product';

describe('Product', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    
    it('Should create an a product', async () => {

        let params: IProduct = <IProduct>{
            code: "PROD1", name: "Produit test 1", price : 5.25, taxPercent:8,
            description: "Tube de 25 mm", entityId: "ENTTEST"
        };
        let query: ProductService = new ProductService();
        const product = await query.create(params);
    });
});