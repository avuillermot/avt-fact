import { IToken } from '../models/token';
import { Secure } from './_secure.helper'
import { Router } from 'express';
//****************************************************************************
// CONTEXT
//****************************************************************************
const router: Router = Router();
/**
 * @api {get} /context [Get data context]
 * @apiDescription Descrypt token to read context. Do on server to not share passphrase
 */
router.get('/context', Secure.authenticate, async (req, res) => {
    let token: IToken = await Secure.decrypt(req.headers.authorization);
    res.send({
        login: token.login, entity: token.currentEntity.name
    });
});

export default router;