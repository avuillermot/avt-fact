import Quote, { IQuote } from "./../models/document/quote"

export class QuoteService {
    public async getAll(entity:string): Promise<IQuote[]> {
        let quotes: IQuote[];
        quotes = await Quote.find({ entityId: entity });
        return quotes;
    }
}