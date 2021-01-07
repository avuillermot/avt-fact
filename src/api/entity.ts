import jwt = require('jsonwebtoken');
import { IToken } from '../models/token';
import { EntityService } from '../services/entity.serv';
import { IEntity } from '../models/entity/entity';
import { Secure } from './_secure.helper';
import { Router } from 'express';
import { ApplicationSetting } from '../config';

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

router.get('/entity/current', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: EntityService = new EntityService();
    let back: IEntity | null = await serv.get(token.currentEntity._id);
    res.send(back);
});

router.post('/entity', async (req, res) => {
    let srv: EntityService = new EntityService();
});

export default router;