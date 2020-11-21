import express = require('express');
import cors = require('cors');
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { CustomerService } from './controllers/customer.serv';
import { ProductService } from './controllers/product.serv';
import { EntityService } from './controllers/entity.serv';
import url = require('url');
import bodyParser = require('body-parser');
import { ICustomer } from './models/entity/customer';
import { IProduct } from './models/entity/product'
import { IItemLine } from './models/document/itemLine';
import { IEntity } from './models/entity/entity';


// rest of the code remains same
const app = express();
const PORT = 8000;
let db: DbSettings = new DbSettings();
db.connection();

app.use(cors())
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fnPrev = function (req:any, res:any, next:any) {
    console.log(req.headers);
    next();
};

//****************************************************************************
// CUSTOMER
//****************************************************************************
app.get('/customers', fnPrev, async(req, res) => {
    let serv: CustomerService = new CustomerService();
    const params: { entity: string, id: string } = <any>url.parse(req.url, true).query;
    res.send(await serv.getAll(params.entity));
});

app.get('/customer', async (req, res) => {
    let serv: CustomerService = new CustomerService();
    const params: { entity: string, id: string } = <any> url.parse(req.url, true).query;
    res.send(await serv.get(params.entity, params.id));
});

app.put('/customer', async (req, res) => {
    let serv: CustomerService = new CustomerService();
    const params: { entity: string, id: string } = <any>url.parse(req.url, true).query;
    try {
        let customer:ICustomer = await serv.update(req.body);
        res.send(customer);
    }
    catch (ex) {
        res.status(500).send(ex.toString());
    }
});

app.post('/customer', async (req, res) => {
    let serv: CustomerService = new CustomerService();
    const params: { entity: string, id: string } = <any>url.parse(req.url, true).query;
    try {
        let customer: ICustomer = await serv.create(req.body);
        res.send(customer);
    }
    catch (ex) {
        console.log(ex.toString());
        res.status(500).send(ex.toString());
    }
});

//****************************************************************************
// PRODUCT
//****************************************************************************
app.get('/products', async (req, res) => {
    let serv: ProductService = new ProductService();
    const params: { entity: string, id: string } = <any>url.parse(req.url, true).query;
    res.send(await serv.getAll(params.entity));
});

app.get('/product', async (req, res) => {
    let serv: ProductService = new ProductService();
    const params: { entity: string, id: string } = <any>url.parse(req.url, true).query;
    res.send(await serv.get(params.entity, params.id));
});

app.get('/product/startwith', async (req, res) => {
    let serv: ProductService = new ProductService();
    const params: { entity: string, startwith: string } = <any>url.parse(req.url, true).query;
    
    res.send(await serv.startWith(params.entity, params.startwith));
});

app.put('/product', async (req, res) => {
    let serv: ProductService = new ProductService();
    const params: { entity: string, id: string } = <any>url.parse(req.url, true).query;
    try {
        let product: IProduct = await serv.update(req.body);
        res.send(product);
    }
    catch (ex) {
        res.status(500).send(ex.toString());
    }
});

app.post('/product', async (req, res) => {
    let serv: ProductService = new ProductService();
    const params: { entity: string, id: string } = <any>url.parse(req.url, true).query;
    try {
        let product: IProduct = await serv.create(req.body);
        res.send(product);
    }
    catch (ex) {
        console.log(ex.toString());
        res.status(500).send(ex.toString());
    }
});

//****************************************************************************
// ENTITY
//****************************************************************************
app.put('/entity/byuser', async (req, res) => {
    let serv: EntityService = new EntityService();
    let back: IEntity[] | null = await serv.getByUser(req.body.login)
    if (back != null) res.send(back);
    else res.status(401).send();
});

//****************************************************************************
// ITEM LINE
//****************************************************************************
// calcul des montants d'un document, cote serveur pour gerer le probleme des decimaux en js
app.put('/document/calcul', async (req, res) => {


    let data: { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] } =
        { total: 0, taxAmount: 0, totalFreeTax: 0, items: new Array<IItemLine>() };

    let status: number = 200;
    try {
        let origine: { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] } =
            <{ total: 0, taxAmount: 0, totalFreeTax: 0, items: IItemLine[] }> req.body;



        for (let i = 0; i < origine.items.length; i++) {
            let current = origine.items[i];
            current.taxAmount = (current.price * (current.taxPercent / 100)) * current.quantity;
            current.totalFreeTax = current.price * current.quantity;
            current.total = current.taxAmount + current.totalFreeTax;

            data.taxAmount = data.taxAmount + current.taxAmount;
            data.totalFreeTax = data.totalFreeTax + current.totalFreeTax;
            data.total = data.total + current.total;
        }
        data.items = origine.items;
    }
    catch (ex) {
        console.log(ex);
        status = 500;
    }
    console.log(data);
    res.status(status).send(data);
});
app.listen(PORT, () => {
    console.log('[server]: Server is running at https://localhost:%s', PORT);
});