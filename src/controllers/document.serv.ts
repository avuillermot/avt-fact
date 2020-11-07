export abstract class DocumentService {

    public document: any;
    public margeX: number = 50;
    public width: number = 610;
    public defaultFont: string = "Helvetica";
    public defaultFontBold: string = "Helvetica-Bold";

    public pdfRepository: string = "";
}

export interface IDocumentService<T> {
    createAndSave(invoice: T): Promise<{ id: string, hasError: boolean, filename: string }>;
    duplicatePdf(invoiceid: string): Promise<{ id: string, hasError: boolean, filename: string }>;
}