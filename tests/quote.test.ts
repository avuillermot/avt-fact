import { expect } from 'chai';
import "mocha";
import fs = require("fs");
import { QuoteExample, EntityId } from "./utils";
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { QuoteService } from '../src/services/quote.serv';
import { IQuote } from '../src/models/document/quote';

describe('Quote', async() => {

    let db: DbSettings = new DbSettings();
    db.connection();
    db.dropCollection("quotes");

    it('Should create a quote', async () => {

        let query: QuoteService = new QuoteService();
        let quote: IQuote = QuoteExample;

        const document = await query.create(quote, EntityId);
        expect(document.taxAmount).equal(51.22, "quote - tax amount is not valid");
        expect(document.totalFreeTax).equal(640.28, "quote - totaltaxFree amount is not valid");
        expect(document.total).equal(691.5, "quote - total amount is not valid");
        expect(document.status).equal("CREATE", "quote - create status not set");
        expect(document.statusHistory[0].status).equal("CREATE", "quote - create status not set");
        expect(document.entityId).equal(EntityId, "quote - entity not set");
    });
});