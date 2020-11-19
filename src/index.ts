import express = require('express');
import cors = require('cors');
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { CustomerService } from './controllers/customer.serv';
import { ProductService } from './controllers/product.serv';
import { EntityService } from './controllers/entity.serv';
import url = require('url');
import bodyParser = require('body-parser');
import { ICustomer } from './models/entity/customer';
import { IProduct } from './models/entity/product';
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

app.put('/entity/byuser', async (req, res) => {
    let serv: EntityService = new EntityService();
    let back: IEntity[] | null = await serv.getByUser(req.body.login)
    if (back != null) res.send(back);
    else res.status(401).send();
});


app.listen(PORT, () => {
    console.log('[server]: Server is running at https://localhost:%s', PORT);
});