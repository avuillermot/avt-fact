import { DocumentHeaderService } from "./header.serv";
import { IQuote } from "../../models/quote/quote";
import moment = require("moment");

export class QuoteHeaderService extends DocumentHeaderService {

    public constructor(document:any) {
        super(document);
    }

    public async generateHeaderProviderPart(quote: IQuote): Promise<void> {
        await super.setProviderPart(quote.seller);
    }

    public async generateInvoiceAddressPart(quote: IQuote): Promise<void> {
        await super.setAddressPart(quote);
    }

    public async generateCustomerAddressPart(quote: IQuote): Promise<void> {
        await super.setCustomerAddressPart(quote);
    }

    public async generateReference(quote: IQuote): Promise<void> {
        let additionals: string[] = new Array<string>();
        additionals.push("Expire le : " + moment(quote.expirationDate).locale("fr").format("L"));
        await super.setReferencePart(quote, additionals);
    }
}