import url = require('url');
import fs = require("fs");
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "../../src/config";
import { IToken } from '../models/token';
import { QuoteDocumentService } from '../services/quote.document.serv';
import { QuoteService } from '../services/quote.serv';
import { IQuote } from '../models/document/quote';
import { Secure } from './_secure.helper';
import { Router } from 'express';
//****************************************************************************
// QUOTE
//****************************************************************************
const router: Router = Router();

router.get('/quote/pdf', async (req, res) => {
    try {
        const params: { id: string } = <any>url.parse(req.url, true).query;
        const path: string = ApplicationSetting.pdfRepository + params.id + '.pdf';
        if (fs.existsSync(path)) {
            var file = fs.createReadStream(path);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'filename=quote.pdf');
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

});

router.post('/quote', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);

    let serv:QuoteDocumentService = new QuoteDocumentService(ApplicationSetting.pdfRepository);
    let body: IQuote = <IQuote>req.body;
    let result: { id: string, hasError: boolean, filename: string } = await serv.create(body, token.currentEntity._id);
    if (result.hasError) res.status(500).send(result);
    else res.send();
});

router.put('/quote', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);

    let serv: QuoteDocumentService = new QuoteDocumentService(ApplicationSetting.pdfRepository);
    let body: IQuote = <IQuote>req.body;
    body.updatedBy = token.login;
    let result: { id: string, hasError: boolean, filename: string } = await serv.update(body, token.currentEntity._id);
    if (result.hasError) res.status(500).send(result);
    else res.send();
});

router.get('/quote', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv:QuoteDocumentService = new QuoteDocumentService(ApplicationSetting.pdfRepository);

    let result: IQuote[] = await serv.get(<IQuote>{ _id: params.id, entityId: token.currentEntity._id });
    res.send(result);
});

router.get('/quotes', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv:QuoteService = new QuoteService();

    let result: IQuote[] = await serv.getAll(token.currentEntity._id);
    res.send(result);
});

export default router;