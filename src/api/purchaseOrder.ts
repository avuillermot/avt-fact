import url = require('url');
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "../../src/config";
import { IToken } from '../models/token';
import { PurchaseOrderDocumentService } from '../services/purchaseOrder.document.serv';
import { PurchaseOrderService } from '../services/purchaseOrder.serv';
import { IQuote } from '../models/document/quote';
import { Secure } from './_secure.helper';
import { Router } from 'express';
import { IPurchaseOrder } from '../models/document/purchaseOrder';
//****************************************************************************
// QUOTE
//****************************************************************************
const router: Router = Router();

router.get('/purchaseorder/pdf', async (req, res) => {
    var host:string | undefined = req.get('host');
    if (host != undefined && ApplicationSetting.previewPdfAllowDomain.indexOf(host) > -1) {
        try {
            const params: { id: string } = <any>url.parse(req.url, true).query;
            const path: string = ApplicationSetting.pdfRepository + params.id + '.pdf';
            if (fs.existsSync(path)) {
                var file = fs.createReadStream(path);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'filename=purchaseorder.pdf');
                file.pipe(res);
            }
            else {
                console.log("Not exists : " + path);
                res.status(500).send();
            }
        }
        catch (ex) {
            console.log(ex);
            res.status(500).send();
        }
    }
    else res.status(401).send();
});

router.post('/purchaseorder', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);

    let serv: PurchaseOrderDocumentService = new PurchaseOrderDocumentService(ApplicationSetting.pdfRepository);
    let body: IPurchaseOrder = <IPurchaseOrder>req.body;
    body.createdBy = token.login;
    try {
        let result: { id: string, hasError: boolean, filename: string } = await serv.create(body, token.currentEntity._id);
        if (result.hasError) res.status(500).send(result);
        else res.send(result);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

/*router.put('/purchaseorder', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);

    let serv: PurchaseOrderDocumentService = new PurchaseOrderDocumentService(ApplicationSetting.pdfRepository);
    let body: IQuote = <IQuote>req.body;
    body.updatedBy = token.login;
    let result: { id: string, hasError: boolean, filename: string } = await serv.update(body, token.currentEntity._id);
    if (result.hasError) res.status(500).send(result);
    else res.send(result);
});*/

/*router.put('/purchaseorder/lock', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);

    let serv: PurchaseOrderDocumentService = new PurchaseOrderDocumentService(ApplicationSetting.pdfRepository);
    let body: IQuote = <IQuote>req.body;
    body.updatedBy = token.login;
    try {
        let result: { id: string, hasError: boolean, filename: string } = await serv.lock(body, token.currentEntity._id);
        if (result.hasError) res.status(500).send(result);
        else res.send(result);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});*/

router.get('/purchaseorder', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv: PurchaseOrderDocumentService = new PurchaseOrderDocumentService(ApplicationSetting.pdfRepository);

    let result: IPurchaseOrder[] = await serv.get(<IPurchaseOrder>{ _id: params.id, entityId: token.currentEntity._id });
    res.send(result);
});

router.get('/purchaseorders', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv: PurchaseOrderService = new PurchaseOrderService();

    let result: IPurchaseOrder[] = await serv.getAll(token.currentEntity._id);
    res.send(result);
});

export default router;