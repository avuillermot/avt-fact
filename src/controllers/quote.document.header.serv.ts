import { DocumentHeaderService } from "./document.header.serv";
import { IQuote } from "../models/quote/quote";

export class QuoteHeaderService extends DocumentHeaderService {

    public constructor(document:any) {
        super(document);
    }

    public async generateHeaderProviderPart(quote: IQuote): Promise<void> {
        await super.setProviderPart(quote);
    }

    public async generateInvoiceAddressPart(quote: IQuote): Promise<void> {
        await super.setAddressPart(quote);
    }

    public async generateCustomerAddressPart(quote: IQuote): Promise<void> {
        await super.setCustomerAddressPart(quote);
    }

    public async generateHeaderInvoiceReference(quote: IQuote): Promise<void> {
        await super.setInvoiceReferencePart(quote);
    }
}