import { DocumentHeaderService } from "./header.serv";
import { IQuote } from "../../models/document/quote";
import moment = require("moment");

export class QuoteHeaderService extends DocumentHeaderService {

    public constructor(document:any) {
        super(document);
    }

    public async generateHeaderProviderPart(quote: IQuote): Promise<void> {
        await super.setProviderPart(quote.seller);
    }

    public async generateQuoteAddressPart(quote: IQuote): Promise<void> {
        await super.setAddressPart(quote.customer);
    }

    public async generateCustomerAddressPart(quote: IQuote): Promise<void> {
        await super.setCustomerAddressPart(quote.customer);
    }

    public async generateReference(quote: IQuote): Promise<void> {
        let additionals: string[] = new Array<string>();
        additionals.push("Expire le : " + moment(quote.expirationDate).locale("fr").format("L"));
        await super.setReferencePart(quote, additionals);
    }
}