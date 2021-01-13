import express from 'express';
import https = require('https');
import fs = require('fs');
import cors = require('cors');
import { ApplicationDbSettings as DbSettings, ApplicationSetting } from "./../src/config/config";
import bodyParser from 'body-parser';
import { IItemLine } from './models/document/itemLine';
import Parameter from './models/parameter';

import contextRoutes from './api/context';
import customerRoutes from './api/customer';
import entityRoutes from './api/entity';
import productRoutes from './api/product';
import quoteRoutes from './api/quote';
import pdfRoutes from './api/pdf';

console.log("WORKSPACE:" + __dirname);
const options = {
    key: fs.readFileSync('./src/config/key.pem'),
    cert: fs.readFileSync('./src/config/cert.pem')
};

Parameter.findOne({ KEY: "URL_USER_SERVICES" }).then((data) => {
    console.log("URL_USER_SERVICES:" + data);
    ApplicationSetting.urlUserService = data.VALUE;
});

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
        let origine: {total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[]} =
            <{total: 0, taxAmount: 0, totalFreeTax: 0, items: IItemLine[]}> req.body;
               
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
    res.status(status).send(data);
});

app.get('/alive', async (req, res) => {
    res.send("OK FACT");
});

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('[server]: Server is running at https://localhost:%s', process.env.PORT);
});