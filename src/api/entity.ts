import url = require('url');
import jwt = require('jsonwebtoken');
import { IToken } from '../models/token';
import { EntityService } from '../services/entity.serv';
import { IEntity } from '../models/entity/entity';
import { Secure } from './_secure.helper';
import { Router } from 'express';

const router:Router = Router();
//****************************************************************************
// ENTITY
//****************************************************************************
router.put('/entity/byuser', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    let serv: EntityService = new EntityService();
    let back: IEntity[] | null = await serv.getByUser(token.login);
    if (back != null) {
        console.log(back);
        token.entities = back;
        token.currentEntity = back[0];
        let encrypt: string = await jwt.sign(JSON.stringify(token), 'PERRIGNY21160');

        res.send({ token: encrypt });
    }
    else res.status(401).send();
});

export default router;