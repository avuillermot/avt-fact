import { expect } from 'chai';
import moment = require("moment");
import "mocha";
import fs = require("fs");
import { QuoteExample } from "./utils";
import Quote, { IQuote } from '../src/models/quote/quote';
import { QuoteService } from '../src/controllers/quote.printing.serv';
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { BillingWorkflowService } from "./../src/controllers/billing.workflow.serv";

describe('Billing workflow', () => {

    let db: DbSettings = new DbSettings();
    db.connection();

    it('Should create a quote & invoice', async () => {

        let query: QuoteService = new QuoteService(ApplicationSetting.pdfRepository);
        let workflow: BillingWorkflowService = new BillingWorkflowService();
        let quote: IQuote = QuoteExample;

        const document = await query.createAndSave(quote);
        await workflow.createInvoiceFromQuote(document.id, moment().utc().add(10,"days").toDate());
        //expect(fs.existsSync(ApplicationSetting.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + document.filename, function () { });
    });

});