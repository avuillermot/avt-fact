import express from 'express';
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { CustomerService } from './controllers/customer.serv'
import url = require('url');
import bodyParser = require('body-parser');

// rest of the code remains same
const app = express();
const PORT = 8000;
let db: DbSettings = new DbSettings();
db.connection();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/customers', async(req, res) => {
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
    await serv.update(req.body);
    res.send();
});

app.listen(PORT, () => {
    console.log('[server]: Server is running at https://localhost:${PORT}');
});