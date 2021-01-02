import express from 'express';
import cors from 'cors';
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import bodyParser from 'body-parser';
import { IItemLine } from './models/document/itemLine';

import contextRoutes from './api/context';
import customerRoutes from './api/customer';
import entityRoutes from './api/entity';
import productRoutes from './api/product';
import quoteRoutes from './api/quote';
import pdfRoutes from './api/pdf';

// rest of the code remains same
const app = express();
const PORT = 8000;
let db: DbSettings = new DbSettings();
db.connection();

//app.use(cors())
//app.options('*', cors());

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


app.listen(PORT, () => {
    console.log('[server]: Server is running at https://localhost:%s', PORT);
});