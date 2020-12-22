import url = require('url');
import { IToken } from '../models/token';
import { ProductService } from '../services/product.serv';
import { IProduct } from '../models/entity/product';
import { Secure } from './_secure.helper'
import { Router } from 'express';
//****************************************************************************
// PRODUCT
//****************************************************************************
const router: Router = Router();
router.get('/products', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: ProductService = new ProductService();
    const params: { id: string } = <any>url.parse(req.url, true).query;
    res.send(await serv.getAll(token.currentEntity._id));
});

router.get('/product', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: ProductService = new ProductService();
    const params: { id: string } = <any>url.parse(req.url, true).query;
    res.send(await serv.get(token.currentEntity._id, params.id));
});

/*router.get('/product/sales', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: ProductService = new ProductService();
    const params: { id: string } = <any>url.parse(req.url, true).query;
    res.send(await serv.get(token.currentEntity._id, params.id));
});*/

router.get('/product/startwith', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: ProductService = new ProductService();
    const params: { startwith: string } = <any>url.parse(req.url, true).query;

    res.send(await serv.startWith(token.currentEntity._id, params.startwith));
});

router.put('/product', Secure.authenticate, async (req, res) => {
    let serv: ProductService = new ProductService();
    try {
        let product: IProduct = await serv.update(req.body);
        res.send(product);
    }
    catch (ex) {
        res.status(500).send(ex.toString());
    }
});

router.post('/product', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: ProductService = new ProductService();
    const params: { id: string } = <any>url.parse(req.url, true).query;
    try {
        if (req.body.entityId == null || req.body.entityId == undefined || req.body.entityId == "") req.body.entityId = token.currentEntity._id;
        let product: IProduct = await serv.create(req.body);
        res.send(product);
    }
    catch (ex) {
        console.log(ex.toString());
        res.status(500).send(ex.toString());
    }
});

export default router;