import { DocumentBodyService } from "./body.serv"
import { IQuote } from '../../models/document/quote';

export class QuoteBodyService extends DocumentBodyService {

    public constructor(document: any) {
        super(document);
    }

    public async generateTitle(quote: IQuote): Promise<void> {
        await super.setTitle("DEVIS");
    }

    public async generate(quote: IQuote): Promise<void> {
        await this.setDetails({ taxAmount: quote.taxAmount.toString(), total: quote.total.toString() }, quote.items);
    }
}