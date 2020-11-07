import { DocumentFooterService } from "./document.footer.serv"
import { IQuote } from "../models/quote/quote";

export class QuoteFooterService extends DocumentFooterService {

    public constructor(document: any) {
        super(document);
    }

    public async generateFooter(quote: IQuote) {

    }
}