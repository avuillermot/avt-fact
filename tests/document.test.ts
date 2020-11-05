import { expect } from 'chai';
import "mocha";
import { InvoiceService } from "./../src/controllers/invoice.document.serv";
import { IInvoice } from "./../src/models/invoice";
import moment = require("moment");
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { IItemInvoice } from '../src/models/itemInvoice';

describe('Simple test must generate PDF', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("invoices");

    it('Should create a invoice', async () => {

        let query: InvoiceService = new InvoiceService(ApplicationSetting.pdfRepository);
        let invoice: IInvoice = <IInvoice>{
            providerName: "AVU Corp.",
            invoiceLabel: "Adresse facturation",
            customerLabel: "Adresse client",

            providerId1: "pr1",
            providerId2: "pr2",
            providerId3: "pr3"
        }
        invoice.providerZipCode = "69380";
        invoice.providerAddress1 = "8 allée des noisetiers";
        invoice.providerAddress2 = "bib";
        invoice.providerAddress3 = "adresse 3"
        invoice.providerCity = "Lissieu";
        invoice.providerCountry = "FRANCE";
        invoice.providerEmail = "test@bob.com";
        invoice.providerPhone = "0385421423";

        invoice.customerName = "Kuehne+Nagel";

        invoice.invoiceZipCode = "21160";
        invoice.invoiceAddress1 = "7 impasse Henri Lapostolet";
        invoice.invoiceAddress2 = "adresse 2";
        invoice.invoiceAddress3 = "adresse 3";
        invoice.invoiceCity = "Perrigny-les-Dijon";
        invoice.invoiceCountry = "FRANCE";

        invoice.customerZipCode = "21160";
        invoice.customerAddress1 = "7 impasse Henri Lapostolet";
        invoice.customerAddress2 = "adresse 2";
        invoice.customerAddress3 = "adresse 3";
        invoice.customerCity = "Perrigny-les-Dijon";
        invoice.customerCountry = "FRANCE";

        invoice.invoiceNumber = "INV01";
        invoice.invoiceDate = moment().utc().toDate();
        invoice.deliveryDate = moment().utc().toDate();

        invoice.items = new Array<IItemInvoice>();
        invoice.items.push(<IItemInvoice>{ productName: "elagage laurier xxxxxxxxxxxxxxxxxxxxxxxxxxxxx", price: 225.2, quantity: 1, taxPercent: 3 });
        invoice.items.push(<IItemInvoice>{ productName: "elagage laurier xxxxxxxxxxxxxxxxxxxxxxxxxxxxx", price: 225.2, quantity: 2, taxPercent: 5 });
        invoice.items.push(<IItemInvoice>{ productName: "elagage herablexxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", price: 125.2, quantity: 3, taxPercent: 7 });

        const document = await query.createAndSave(invoice);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + document.filename, function () { });
    });
});