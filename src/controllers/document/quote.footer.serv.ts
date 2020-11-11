import { DocumentFooterService } from "./footer.serv"
import { IQuote } from "../../models/document/quote";

export class QuoteFooterService extends DocumentFooterService {

    public constructor(document: any) {
        super(document);
    }

    public async generate(quote: IQuote): Promise<void> {
        return super.generateFooter([]);
    }
}