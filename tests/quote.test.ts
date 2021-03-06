﻿import { expect } from 'chai';
import "mocha";
import { QuoteExample, EntityId } from "./utils";
import { ApplicationDbSettings as DbSettings, ApplicationSetting } from "./../src/config/config";
import { QuoteService } from '../src/services/quote.serv';
import { IQuote } from '../src/models/document/quote';
import Entity, { IEntity } from '../src/models/entity/entity';

describe('Quote', async() => {

    let db: DbSettings = new DbSettings();
    db.connection();
    
    it('Should create a quote', async () => {
        const entity: IEntity = <IEntity>await Entity.findOne();
        let query: QuoteService = new QuoteService();
        let quote: IQuote = QuoteExample;

        const document = await query.create(quote, entity._id);
        expect(document.taxAmount).equal(51.22, "quote - tax amount is not valid");
        expect(document.totalFreeTax).equal(640.28, "quote - totaltaxFree amount is not valid");
        expect(document.total).equal(691.5, "quote - total amount is not valid");
        expect(document.status).equal("CREATE", "quote - create status not set");
        expect(document.statusHistory[0].status).equal("CREATE", "quote - create status not set");
        expect(document.entityId).equal(EntityId, "quote - entity not set");
    });


    it('Find unique number', async () => {
        let query: QuoteService = new QuoteService();
        await query.getNumDocument("DE", "QUOTE");
    })
});