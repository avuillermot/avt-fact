import { expect } from 'chai';
import moment = require("moment");
import "mocha";
import fs = require("fs");
import { QuoteExample, PurchaseOrderExample, SalesReceiptExample } from "./utils";
import Quote, { IQuote } from '../src/models/document/quote';
import SalesReceipt, { ISalesReceipt } from '../src/models/document/salesReceipt';
import PurchaseOrder, { IPurchaseOrder } from '../src/models/document/purchaseOrder';
import { QuoteService } from '../src/controllers/quote.document.serv';
import { PurchaseOrderService } from '../src/controllers/purchaseOrder.document.serv';
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { BillingWorkflowService } from "./../src/controllers/billing.workflow.serv";

describe('Billing workflow', () => {

    let db: DbSettings = new DbSettings();
    db.connection();

    it('Should create a sales receipt from a quote', async () => {

        let query: QuoteService = new QuoteService(ApplicationSetting.pdfRepository);
        let workflow: BillingWorkflowService = new BillingWorkflowService();
        let quote: IQuote = QuoteExample;
        
        const quoteResult = await query.createAndSave(quote, "5fabc76ed0c4b12444fa45ca");
        expect(fs.existsSync(ApplicationSetting.pdfRepository + quoteResult.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + quoteResult.filename, function () { });

        const saleResult = await workflow.createSalesReceiptFromQuote(quoteResult.id);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + saleResult.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + saleResult.filename, function () { });

        const myQuote = <IQuote>await Quote.findOne({ _id: quoteResult.id });
        const mySale = <ISalesReceipt>await SalesReceipt.findOne({ _id: saleResult.id });

        expect(myQuote.total, "Total are not equal").equal(mySale.total);
        expect(myQuote.totalFreeTax, "Total tax free are not equal").equal(mySale.totalFreeTax);
        expect(myQuote.taxAmount, "Tax amount are not equal").equal(mySale.taxAmount);
        expect(myQuote.id, "Link between quote and sale is broken").equal(mySale.quoteId);
        expect(myQuote.customer.id, "CustomerId are not equal").equal(mySale.customer.id);
        expect(myQuote.entityId, "Entity are not equal").equal(mySale.entityId);
        expect(myQuote.fileName, "Quote - file & id are different").equal(myQuote.id + ".pdf");
        expect(mySale.fileName, "Quote - file & id are different").equal(mySale.id + ".pdf");
    });

    it('Should create a sales receipt from a purchase order', async () => {

        let query: PurchaseOrderService = new PurchaseOrderService(ApplicationSetting.pdfRepository);
        let workflow: BillingWorkflowService = new BillingWorkflowService();
        let po: IPurchaseOrder = PurchaseOrderExample;

        const poResult = await query.createAndSave(po, "5fabc76ed0c4b12444fa45ca");
        expect(fs.existsSync(ApplicationSetting.pdfRepository + poResult.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + quoteResult.filename, function () { });

        const saleResult = await workflow.createSalesReceiptFromPurchaseOrder(poResult.id);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + saleResult.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + saleResult.filename, function () { });

        const myPO = <IPurchaseOrder>await PurchaseOrder.findOne({ _id: poResult.id });
        const mySale = <ISalesReceipt>await SalesReceipt.findOne({ _id: saleResult.id });

        expect(myPO.total, "Total are not equal").equal(mySale.total);
        expect(myPO.totalFreeTax, "Total tax free are not equal").equal(mySale.totalFreeTax);
        expect(myPO.taxAmount, "Tax amount are not equal").equal(mySale.taxAmount);
        expect(myPO.id, "Link between quote and sale is broken").equal(mySale.quoteId);
        expect(myPO.customer.id, "CustomerId are not equal").equal(mySale.customer.id);
        expect(myPO.entityId, "Entity are not equal").equal(mySale.entityId);
        expect(myPO.fileName, "PurchaseOrder - file & id are different").equal(myPO.id + ".pdf");
        expect(mySale.fileName, "PurchaseOrder - file & id are different").equal(mySale.id + ".pdf");
    });

});