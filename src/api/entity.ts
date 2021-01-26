import jwt from 'jsonwebtoken';
import { IToken } from '../models/token';
import { EntityCreateService } from '../services/entity.create.serv';
import { EntityService } from '../services/entity.serv';
import { IEntity } from '../models/entity/entity';
import { Secure } from './_secure.helper';
import { Router } from 'express';
import { ApplicationSetting } from '../config/config';
import { IEntityCreate } from '../models/entity/entity.create';

const router:Router = Router();
//****************************************************************************
// ENTITY
//****************************************************************************
router.put('/entity/byuser', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: EntityService = new EntityService();
    let back: IEntity[] | null = await serv.getByUser(token.login);
    if (back != null && back.length > 0) {
        token.entities = back;
        token.currentEntity = back[0];
        let encrypt: string = await jwt.sign(JSON.stringify(token), ApplicationSetting.jtokenSecretKey);

        res.send({ token: encrypt });
    }
    else res.status(401).send();
});
/**
 * @api {get} / [Get current entity]
 * @apiGroup Context
 * @apiDescription Return current entity based on token
 * @apiSuccess (Succes) {JSON} Data Return entity - 
    name: string;
    address1: string;
    address2: string;
    address3: string;
    zipCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    siren: string;
    siret: string;
    codeAPE: string;
    codeTVA: string;
    legalType: string;
    capital: number;
    users: IRoles[];
   @apiPermission authenticated
 */
router.get('/entity/current', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: EntityService = new EntityService();
    let back: IEntity | null = await serv.get(token.currentEntity._id);
    res.send(back);
});
/**
 * @api {post} /entity [Create entity]
 * @apiGroup Enity
 * @apiDescription Create one entity and its owner
 * @apiSuccess (Succes) {String} ID Return entity id
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 */
router.post('/entity', async (req, res) => {
    if (req.body.entity == null || req.body.entity == undefined) res.status(500).send("ENTITY is mandatory");
    else if (req.body.owner == null || req.body.owner == undefined) res.status(500).send("OWNER is mandatory");
    else {
        try {
            let srv: EntityCreateService = new EntityCreateService();
            const entity: IEntity = await srv.create(req.body.entity, req.body.owner);
            res.send(entity._id);
        }
        catch (ex) {
            console.log(ex.message);
            res.status(500).send(ex.message);
        }
    }

});
/**
 * @api {post} /entity/uncomplete [Create entity uncomplete]
 * @apiGroup Enity
 * @apiDescription Create one entity uncomplete and its owner. Uncomplete means without all the information about the entity. Other information will be
 * setting later in the process
 * @apiParamExample Request-Example:
 *     {
 *      "name": "string";
 *      "address1": "string";
 *      "address2": "string";
 *      "address3": "string";
 *      "zipCode": "string";
 *      "city": "string";
 *      "country": "string";
 *      "email": "string";
 *     }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500
 * @apiSampleRequest off
 */
router.post('/entity/uncomplete', async (req, res) => {
    if (req.body.entity == null || req.body.entity == undefined) res.status(500).send("ENTITY is mandatory");
    else if (req.body.owner == null || req.body.owner == undefined) res.status(500).send("OWNER is mandatory");
    else {
        try {
            let srv: EntityCreateService = new EntityCreateService();
            const entity: IEntityCreate = await srv.createUncomplete(req.body.entity, req.body.owner);
            res.send(entity._id);
        }
        catch (ex) {
            console.log(ex.message);
            res.status(500).send(ex.message);
        }
    }

});

export default router;