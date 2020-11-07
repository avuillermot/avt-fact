import { DocumentBodyService } from "./document.body.serv"
import { IQuote } from '../models/quote/quote';

export class QuoteBodyService extends DocumentBodyService {

    public constructor(document: any) {
        super(document);
    }

    public async generateTitle(quote: IQuote): Promise<void> {
        await super.setTitle("DEVIS");
    }

    public async generateDetails(quote: IQuote): Promise<void> {
        await this.setDetails({ taxAmount: quote.taxAmount.toString(), total: quote.total.toString() }, quote.items);
    }
}