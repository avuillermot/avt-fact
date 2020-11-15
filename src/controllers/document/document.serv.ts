import moment from "moment";

export abstract class DocumentService {

    public document: any;
    public margeX: number = 50;
    public width: number = 610;
    public defaultFont: string = "Helvetica";
    public defaultFontBold: string = "Helvetica-Bold";

    public pdfRepository: string = "";

    public getRandomIntInclusive(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getNumDocument(type:string): string {
        return type + moment().utc().format("YY") + moment().utc().format("MM") + moment().utc().format("DD")  + this.getRandomIntInclusive(1000,9999);
    }
}

export interface IDocumentService<T> {
    createAndSave(document: T, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string }>;
    duplicatePdf(documentId: string): Promise<{ id: string, hasError: boolean, filename: string }>;
}