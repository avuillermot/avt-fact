export abstract class DocumentService {

    public document: any;
    public margeX: number = 50;
    public width: number = 610;
    public defaultFont: string = "Helvetica";
    public defaultFontBold: string = "Helvetica-Bold";

    public pdfRepository: string = "";
}

export interface IDocumentService<T> {
    createAndSave(document: T, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string }>;
    duplicatePdf(documentId: string): Promise<{ id: string, hasError: boolean, filename: string }>;
}