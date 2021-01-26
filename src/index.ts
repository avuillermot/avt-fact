import express from 'express';
import https = require('https');
import fs = require('fs');
import cors = require('cors');
import { ApplicationDbSettings as DbSettings, ApplicationSetting } from "./../src/config/config";
import bodyParser from 'body-parser';
import { IItemLine } from './models/document/itemLine';
import contextRoutes from './api/context';
import customerRoutes from './api/customer';
import entityRoutes from './api/entity';
import productRoutes from './api/product';
import quoteRoutes from './api/quote';
import pdfRoutes from './api/pdf';
import { PriceEngine } from './services/price.engine';

console.log("WORKSPACE:" + __dirname);
console.log("******************************************************");
console.log("ENV VARIABLE:");
console.log(Object.keys(process.env).filter((value:string, index:number) => {
    if (value != undefined && value != null && value.startsWith("APP_")) console.log(value.padEnd(40) + process.env[value]);
}));
console.log("******************************************************");

const options = {
    key: fs.readFileSync('./src/config/key.pem'),
    cert: fs.readFileSync('./src/config/cert.pem')
};

// rest of the code remains same
const app = express();
let db: DbSettings = new DbSettings();
db.connection();

app.use(cors())
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(contextRoutes);
app.use(customerRoutes);
app.use(entityRoutes);
app.use(productRoutes);
app.use(quoteRoutes);
app.use(pdfRoutes);

//****************************************************************************
// ITEM LINE
//****************************************************************************
// calcul des montants d'un document, cote serveur pour gerer le probleme des decimaux en js
app.put('/document/calcul', async (req, res) => {

    let data: { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] } =
    {
        total: 0, taxAmount: 0, totalFreeTax: 0, items: new Array<IItemLine>()
    };

    let status: number = 200;
    try {
        let origine: { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] } =
            <{ total: 0, taxAmount: 0, totalFreeTax: 0, items: IItemLine[] }>req.body;

        data = PriceEngine.calculate(origine);
    }
    catch (ex) {
        console.log(ex);
        status = 500;
    }
    res.status(status).send(data);
});

app.get('/alive', async (req, res) => {
    res.send("OK FACT");
});

app.get('/countries', async (req, res) => {
    const countries: { code: string, label: string }[] = new Array<{ code: string, label: string }>();
    countries.push({code: 'FR', label: 'France'});
    res.send(countries);
});

https.createServer(options, app).listen(process.env.APP_PORT, () => {
    console.log('[server]: Server is running at https://localhost:%s', process.env.APP_PORT);
});