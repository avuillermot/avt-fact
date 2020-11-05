import { IInvoice } from "../models/invoice";

export class InvoiceFooterService {

    document:any;
    public margeX: number = 0;
    public width: number = 0;
    public height: number = 600;
    public defaultFont: string = "";
    public defaultFontBold: string = "";

    public constructor(document: any) {
        this.document = document;
    }

    public async generateFooter(invoice: IInvoice) {

    }
}