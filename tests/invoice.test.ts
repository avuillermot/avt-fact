import { expect } from 'chai';
import "mocha";
import { QuoteService } from "./../src/controllers/quote.document.serv";
import { IQuote } from "./../src/models/quote/quote";
import moment = require("moment");
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { IItemInvoice } from '../src/models/invoice/itemInvoice';
import { InvoiceService } from '../src/controllers/invoice.document.serv';
import { IInvoice } from '../src/models/invoice/invoice';

describe('Invoice', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("invoices");

    it('Should create a invoice & PDF', async () => {

        let query: InvoiceService = new InvoiceService(ApplicationSetting.pdfRepository);
        let invoice: IInvoice = <IInvoice>{
            providerName: "Green light.",
            invoiceLabel: "Adresse facturation",
            customerLabel: "Adresse client",

            providerId1: "SIREN : 34345646",
            providerId2: "Agrement 123",
            providerId3: "pr3"
        }
        invoice.providerZipCode = "69300";
        invoice.providerAddress1 = "1 Chemin des aubepines";
        invoice.providerAddress2 = "-";
        invoice.providerAddress3 = "-"
        invoice.providerCity = "Ecully";
        invoice.providerCountry = "FRANCE";
        invoice.providerEmail = "test@bob.com";
        invoice.providerPhone = "0385421423";

        invoice.customerName = "John Doe";

        invoice.invoiceZipCode = "21160";
        invoice.invoiceAddress1 = "7 impasse de la mer";
        invoice.invoiceAddress2 = "-";
        invoice.invoiceAddress3 = "-";
        invoice.invoiceCity = "Dijon";
        invoice.invoiceCountry = "FRANCE";

        invoice.customerZipCode = "69380";
        invoice.customerAddress1 = "1 rue de l'océan";
        invoice.customerAddress2 = "-";
        invoice.customerAddress3 = "-";
        invoice.customerCity = "Lissieu";
        invoice.customerCountry = "FRANCE";

        invoice.invoiceNumber = "4274175";
        invoice.invoiceDate = moment().utc().toDate();
        invoice.deliveryDate = moment().utc().toDate();
        invoice.dueDate = moment().utc().toDate();

        invoice.items = new Array<IItemInvoice>();

        invoice.items.push(<IItemInvoice>{ productName: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8 });
        invoice.items.push(<IItemInvoice>{ productName: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8 });
        invoice.items.push(<IItemInvoice>{ productName: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8 });

        invoice.items.push(<IItemInvoice>{ productName: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8 });

        invoice.items.push(<IItemInvoice>{ productName: "Vidange", price: 45, quantity: 1, taxPercent: 8 });

        invoice.items.push(<IItemInvoice>{ productName: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8 });

        const document = await query.createAndSave(invoice);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + document.filename, function () { });
    });

    /*it('Should generate a duplicate PDF', async () => {

        let query: InvoiceService = new InvoiceService(ApplicationSetting.pdfRepository);
        let result = await query.duplicatePdf('5fa52e198e7de919a4b18bcd');
        console.log(result);
    });*/
});