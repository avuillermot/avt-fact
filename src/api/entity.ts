import jwt from 'jsonwebtoken';
import { IToken } from '../models/token';
import { EntityService } from '../services/entity.serv';
import { IEntity } from '../models/entity/entity';
import { Secure } from './_secure.helper';
import { Router } from 'express';
import { ApplicationSetting } from '../config/config';

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
 * @api {post} / [Create entity]
 * @apiGroup CreateEntity
 * @apiDescription Create one entity and its owner
 * @apiSuccess (Succes) {String} ID Return entity id
 * @apiError (Error) {Number} HttpCode 500 and response inlucdes error description
 * @apiPermission authenticated
 */
router.post('/entity', async (req, res) => {
    if (req.body.entity == null || req.body.entity == undefined) res.status(500).send("ENTITY is mandatory");
    else if (req.body.owner == null || req.body.owner == undefined) res.status(500).send("OWNER is mandatory");
    else {
        try {
            let srv: EntityService = new EntityService();
            const entity: IEntity = await srv.create(req.body.entity, req.body.owner);
            res.send(entity._id);
        }
        catch (ex) {
            console.log(ex.message);
            res.status(500).send(ex.message);
        }
    }

});

export default router;