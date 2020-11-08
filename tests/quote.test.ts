import { expect } from 'chai';
import "mocha";
import fs = require("fs");
import { QuoteExample } from "./utils";
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { QuoteService } from '../src/controllers/quote.printing.serv';
import Quote, { IQuote } from '../src/models/quote/quote';

describe('Quote', async() => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("quotes");

    it('Should create a quote & PDF', async () => {

        let query: QuoteService = new QuoteService(ApplicationSetting.pdfRepository);
        let quote: IQuote = QuoteExample;

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