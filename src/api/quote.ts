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
/**
 * @api {post} /quote [Create]
 * @apiGroup Quote
 * @apiDescription Create a quote
 * @apiSuccess (Succes) {JSON} Return quote created
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 * @apiPermission authenticated
 */
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
/**
 * @api {put} /quote [Update]
 * @apiGroup Quote
 * @apiDescription Update a quote
 * @apiSuccess (Succes) {JSON} Return quote updated
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 * @apiPermission authenticated
 */
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
/**
 * @api {put} /quote/lock/:id [Lock]
 * @apiGroup Quote
 * @apiDescription Lock a quote before sending to customer. Quote can't be updated anymore
 * @apiSuccess (Succes) {JSON} Return quote locked
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 * @apiPermission authenticated
 */
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
/**
 * @api {put} /quote/cancel/:id [Cancel]
 * @apiGroup Quote
 * @apiDescription Cancel (not deleted)
 * @apiSuccess (Succes) {JSON} Return quote locked
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 * @apiPermission authenticated
 */
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
/**
 * @api {put} /quote/accept/:id [Accept]
 * @apiGroup Quote
 * @apiDescription Accept when a customer sign a quote
 * @apiSuccess (Succes) {JSON} Return quote accepted
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 * @apiPermission authenticated
 */
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
/**
 * @api {put} /quote/reject/:id [Reject]
 * @apiGroup Quote
 * @apiDescription Reject when a customer doesn't sign a quote
 * @apiSuccess (Succes) {JSON} Return quote rejected
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 * @apiPermission authenticated
 */
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
/**
 * @api {get} /quote/:id [Get one]
 * @apiGroup Quote
 * @apiDescription Return one quote
 * @apiSuccess (Succes) {JSON} Return quote
 * @apiPermission authenticated
 */
router.get('/quote', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv:QuoteService = new QuoteService();

    let result: IQuote[] = await serv.get(<IQuote>{ _id: params.id, entityId: token.currentEntity._id });
    res.send(result);
});
/**
 * @api {get} /quotes [Get all]
 * @apiGroup Quote
 * @apiDescription Return quotes for entity
 * @apiSuccess (Succes) {JSON} Return quotes
 * @apiPermission authenticated
 */
router.get('/quotes', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    const params: { id: string } = <any>url.parse(req.url, true).query;

    let serv: QuoteService = new QuoteService();

    let result: IQuote[] = await serv.getAll(token.currentEntity._id);
    res.send(result);
});

export default router;