export abstract class DocumentFooterService {

    document: any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";

    public constructor(document: any) {
        this.document = document;
    }
}