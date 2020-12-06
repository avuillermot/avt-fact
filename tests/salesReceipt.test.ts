import { expect } from 'chai';
import "mocha";
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { SalesReceiptExample, EntityId } from "./utils";
import { SalesReceiptService } from '../src/services/salesReceipt.document.serv';
import SalesReceipt, { ISalesReceipt } from '../src/models/document/salesReceipt';

describe('SalesReceipt', () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("salesreceipts");
    
    it('Should create a sales receipt & PDF', async() => {

        let query: SalesReceiptService = new SalesReceiptService(ApplicationSetting.pdfRepository);
        let sales: ISalesReceipt = SalesReceiptExample;

        const document = await query.createAndSave(sales, EntityId);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + document.filename, function () { });
    });

    it('Should generate a duplicate PDF', async () => {
        let input: ISalesReceipt = <ISalesReceipt>await SalesReceipt.findOne();
        let query: SalesReceiptService = new SalesReceiptService(ApplicationSetting.pdfRepository);
        let result = await query.duplicatePdf(input._id);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + result.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + result.filename, function () { });
    });
});