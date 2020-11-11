import { expect } from 'chai';
import "mocha";
import fs = require("fs");
import { PurchaseOrderExample } from "./utils";
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { PurchaseOrderService } from '../src/controllers/purchaseOrder.document.serv';
import PurchaseOrder, { IPurchaseOrder } from '../src/models/document/purchaseOrder';

describe('Quote', async () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    //db.dropCollection("quotes");

    it('Should create a purchase order & PDF', async () => {

        let query: PurchaseOrderService = new PurchaseOrderService(ApplicationSetting.pdfRepository);
        let po: IPurchaseOrder = PurchaseOrderExample;

        const document = await query.createAndSave(po, "5fabc76ed0c4b12444fa45ca");
        expect(fs.existsSync(ApplicationSetting.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + document.filename, function () { });
    });

    it('Should generate a duplicate PDF', async () => {
        let input: IPurchaseOrder = <IPurchaseOrder>await PurchaseOrder.findOne();
        let query: PurchaseOrderService = new PurchaseOrderService(ApplicationSetting.pdfRepository);
        let result = await query.duplicatePdf(input._id);
        expect(fs.existsSync(ApplicationSetting.pdfRepository + result.filename), "PDF file won't exists").equal(true);
        //fs.unlink(ApplicationSetting.pdfRepository + result.filename, function () { });
    });
});