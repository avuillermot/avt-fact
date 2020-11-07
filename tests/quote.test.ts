import { expect } from 'chai';
import "mocha";
import moment = require("moment");
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { IItemInvoice } from '../src/models/invoice/itemInvoice';
import { QuoteService } from '../src/controllers/quote.document.serv';
import Quote, { IQuote } from '../src/models/quote/quote';

describe('Quote', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("quotes");

    it('Should create a invoice & PDF', async () => {

        let query: QuoteService = new QuoteService(ApplicationSetting.pdfRepository);
        let quote: IQuote = <IQuote>{
            providerName: "Green light.",
            invoiceLabel: "Adresse facturation",
            customerLabel: "Adresse client",

            providerId1: "SIREN : 34345646",
            providerId2: "Agrement 123",
            providerId3: "pr3"
        }
        quote.providerZipCode = "69300";
        quote.providerAddress1 = "1 Chemin des aubepines";
        quote.providerAddress2 = "-";
        quote.providerAddress3 = "-"
        quote.providerCity = "Ecully";
        quote.providerCountry = "FRANCE";
        quote.providerEmail = "test@bob.com";
        quote.providerPhone = "0385421423";

        quote.customerName = "John Doe";

        quote.invoiceZipCode = "21160";
        quote.invoiceAddress1 = "7 impasse de la mer";
        quote.invoiceAddress2 = "-";
        quote.invoiceAddress3 = "-";
        quote.invoiceCity = "Dijon";
        quote.invoiceCountry = "FRANCE";

        quote.customerZipCode = "69380";
        quote.customerAddress1 = "1 rue de l'océan";
        quote.customerAddress2 = "-";
        quote.customerAddress3 = "-";
        quote.customerCity = "Lissieu";
        quote.customerCountry = "FRANCE";

        quote.invoiceNumber = "4274175";
        quote.invoiceDate = moment().utc().toDate();
                
        quote.items = new Array<IItemInvoice>();

        quote.items.push(<IItemInvoice>{ productName: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8 });
        quote.items.push(<IItemInvoice>{ productName: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8 });
        quote.items.push(<IItemInvoice>{ productName: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8 });

        quote.items.push(<IItemInvoice>{ productName: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8 });

        quote.items.push(<IItemInvoice>{ productName: "Vidange", price: 45, quantity: 1, taxPercent: 8 });

        quote.items.push(<IItemInvoice>{ productName: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8 });

        const document = await query.createAndSave(quote);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        fs.unlink(ApplicationSetting.pdfRepository + document.filename, function () { });
    });

    it('Should generate a duplicate PDF', async () => {
        let input: IQuote = <IQuote>await Quote.findOne();
        let query: QuoteService = new QuoteService(ApplicationSetting.pdfRepository);
        let result = await query.duplicatePdf(input._id);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + result.filename), "PDF file won't exists").equal(true);
        fs.unlink(ApplicationSetting.pdfRepository + result.filename, function () { });
    });
});