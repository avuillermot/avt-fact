import AsyncLock = require('async-lock');
import moment = require('moment');
import Quote, { IQuote } from '../../models/document/quote';

export interface IDocumentService<T> {
    get(params: T): Promise<T[]>;
    getAll(entity: string): Promise<T[]>;
    create(document: T, sellerId: string): Promise<T>;
    update(document: T, sellerId: string): Promise<T>;
    lock(document: T, sellerId: string): Promise<T>;
}

export class DocumentBaseService<T> {

    private static lock: AsyncLock = new AsyncLock();
    private static num: number = 0;

    public async getNumDocument(prefix: string, typeDocument: string): Promise<string> {
        let startWith: string = prefix + moment.utc().format("YYYYMMDD") + "-";
        let query: string = "^" + startWith;
        let index: number = 0;
        await DocumentBaseService.lock.acquire('key', async function () {
            if (typeDocument == "QUOTE") {
                let quotes: IQuote[] = await Quote.find({ number: { $regex: query } }).select("number");
                if (quotes.length > 0) {
                    let indexes: string = quotes.map(quote => quote.number.replace(startWith, ""))
                        .reduce((acc: string, current: string) => {
                            if (parseInt(current) > parseInt(acc)) return current;
                            else return acc;
                        });
                    index = parseInt(indexes);
                }
                else index = 0;
            }
            else throw new Error("NumDocument not implemented !")
        });
        console.log(index);
        //console.log(++index);
        return startWith + ++index
    }
}