import url = require('url');
import { IToken } from '../models/token';
import { CustomerService } from '../services/customer.serv';
import { ICustomer } from '../models/entity/customer';
import { Secure } from './_secure.helper';
import { Router } from 'express';
//****************************************************************************
// CUSTOMER
//****************************************************************************
const router: Router = Router();
/**
 * @api {get} /customers [Get all customers]
 * @apiDescription Return all customers by entity
 * @apiPermission authenticated
 */
router.get('/customers', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: CustomerService = new CustomerService();
    res.send(await serv.getAll(token.currentEntity._id));
});
/**
 * @api {get} /customer/:id [Get one customer]
 * @apiDescription Return one customer
 * @apiPermission authenticated
 */
router.get('/customer', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: CustomerService = new CustomerService();
    const params: { id: string } = <any>url.parse(req.url, true).query;
    res.send(await serv.get(token.currentEntity._id, params.id));
});

router.put('/customer', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: CustomerService = new CustomerService();
    try {
        let customer: ICustomer = await serv.update(req.body);
        res.send(customer);
    }
    catch (ex) {
        res.status(500).send(ex.toString());
    }
});

router.post('/customer', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: CustomerService = new CustomerService();
    try {
        if (req.body.entityId == null || req.body.entityId == undefined || req.body.entityId == "") req.body.entityId = token.currentEntity._id;
        let customer: ICustomer = await serv.create(req.body);
        res.send(customer);
    }
    catch (ex) {
        console.log(ex.toString());
        res.status(500).send(ex.toString());
    }
});

router.get('/customer/startwith', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: CustomerService = new CustomerService();
    const params: { startwith: string } = <any>url.parse(req.url, true).query;

    res.send(await serv.startWith(token.currentEntity._id, params.startwith));
});

export default router;