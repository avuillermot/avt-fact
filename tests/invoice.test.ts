import { expect } from 'chai';
import "mocha";
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { InvoiceExample } from "./utils";
import { InvoiceService } from '../src/controllers/invoice.document.serv';
import Invoice, { IInvoice } from '../src/models/invoice/invoice';

describe('Invoice', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("invoices");
    
    it('Should create a invoice & PDF', async() => {

        let query: InvoiceService = new InvoiceService(ApplicationSetting.pdfRepository);
        let invoice: IInvoice = InvoiceExample;

        const document = await query.createAndSave(invoice, "5faab4a0e178fb3abc146554");
        expect(fs.existsSync(ApplicationSetting.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        fs.unlink(ApplicationSetting.pdfRepository + document.filename, function () { });
    });

    it('Should generate a duplicate PDF', async () => {
        let input: IInvoice = <IInvoice>await Invoice.findOne();
        let query: InvoiceService = new InvoiceService(ApplicationSetting.pdfRepository);
        let result = await query.duplicatePdf(input._id);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + result.filename), "PDF file won't exists").equal(true);
        fs.unlink(ApplicationSetting.pdfRepository + result.filename, function () { });
    });
});