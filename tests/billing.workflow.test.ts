import { expect } from 'chai';
import moment = require("moment");
import "mocha";
import fs = require("fs");
import { QuoteExample } from "./utils";
import Quote, { IQuote } from '../src/models/quote/quote';
import Invoice, { IInvoice } from '../src/models/invoice/invoice';
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
        
        const quoteResult = await query.createAndSave(quote);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + quoteResult.filename), "PDF file won't exists").equal(true);
        fs.unlink(ApplicationSetting.pdfRepository + quoteResult.filename, function () { });

        const saleResult = await workflow.createInvoiceFromQuote(quoteResult.id, moment().utc().add(10,"days").toDate());
        expect(fs.existsSync(ApplicationSetting.pdfRepository + saleResult.filename), "PDF file won't exists").equal(true);
        fs.unlink(ApplicationSetting.pdfRepository + saleResult.filename, function () { });

        const myQuote = <IQuote>await Quote.findOne({ _id: quoteResult.id });
        const mySale = <IInvoice>await Invoice.findOne({ _id: saleResult.id });

        expect(myQuote.total, "Total are not equal").equal(mySale.total);
        expect(myQuote.totalFreeTax, "Total tax free are not equal").equal(mySale.totalFreeTax);
        expect(myQuote.taxAmount, "Tax amount are not equal").equal(mySale.taxAmount);
        expect(myQuote._id.toString(), "Link between quote and sale is broken").equal(mySale.quoteId);
        expect(myQuote.customerId, "CustomerId are not equal").equal(mySale.customerId);
        expect(myQuote.entityId, "Entity are not equal").equal(mySale.entityId);
    });

});