import { expect } from 'chai';
import "mocha";
import fs = require("fs");
import { PurchaseOrderExample, EntityId } from "./utils";
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { PurchaseOrderService } from '../src/controllers/purchaseOrder.document.serv';
import PurchaseOrder, { IPurchaseOrder } from '../src/models/document/purchaseOrder';

describe('Purchase Order', async () => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("purchaseorders");

    it('Should create a purchase order & PDF', async () => {

        let query: PurchaseOrderService = new PurchaseOrderService(ApplicationSetting.pdfRepository);
        let po: IPurchaseOrder = PurchaseOrderExample;

        const document = await query.createAndSave(po, EntityId);
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