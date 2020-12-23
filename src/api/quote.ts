import url = require('url');
import { IToken } from '../models/token';
import { QuoteService } from '../services/quote.serv';
import { IQuote } from '../models/document/quote';
import { Secure } from './_secure.helper';
import { Router } from 'express';
//****************************************************************************
// QUOTE
//****************************************************************************
const router: Router = Router();

router.post('/quote', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let back: IQuote = <IQuote>{};
    let serv:QuoteService = new QuoteService();
    let body: IQuote = <IQuote>req.body;
    body.createdBy = token.login;
    try {
        back = await serv.create(body, token.currentEntity._id);
        res.send(back);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

router.put('/quote', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let back: IQuote = <IQuote>{};
    let serv: QuoteService = new QuoteService();
    let body: IQuote = <IQuote>req.body;
    try {
        body.updatedBy = token.login;
        back = await serv.update(body, token.currentEntity._id);
        res.send(back);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

router.put('/quote/lock', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let back: IQuote = <IQuote>{};
    let serv: QuoteService = new QuoteService();
    let body: IQuote = <IQuote>req.body;
    body.updatedBy = token.login;
    try {
        back = await serv.lock(body, token.currentEntity._id);
        res.send(back);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

router.put('/quote/cancel', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;
    let serv: QuoteService = new QuoteService();
    let back: IQuote = <IQuote>{};
    try {
        back = await serv.cancel(params.id, token.currentEntity._id, token.login);
        res.send(back);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

router.put('/quote/accept', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;
    let serv: QuoteService = new QuoteService();
    let back: IQuote = <IQuote>{};
    try {
        back = await serv.accept(params.id, token.currentEntity._id, token.login);
        res.send(back);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

router.put('/quote/reject', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;
    let serv: QuoteService = new QuoteService();
    let back: IQuote = <IQuote>{};
    try {
        back = await serv.reject(params.id, token.currentEntity._id, token.login);
        res.send(back);
    }
    catch (ex) {
        console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

router.get('/quote', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv:QuoteService = new QuoteService();

    let result: IQuote[] = await serv.get(<IQuote>{ _id: params.id, entityId: token.currentEntity._id });
    res.send(result);
});

router.get('/quotes', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv: QuoteService = new QuoteService();

    let result: IQuote[] = await serv.getAll(token.currentEntity._id);
    res.send(result);
});

export default router;