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

        let baseCol: number = this.width / 4 - 30;
        let col1: number = this.margeX;
        let col2: number = baseCol * 2;
        let col3: number = baseCol * 3;
        let col4: number = baseCol * 4;

        let lineHeight: number = 35;
        let totalPadding: number = 100;
        let total: number = 0;

        /*for (var i = 0; i < invoice.items.length; i++) {
            let item = invoice.items[i];
            total = total + item.price;
        }

        let count = invoice.items.length;

        this.document.fontSize(8).font(this.defaultFont)
            .text("TOTAL", col3, 230 + ((count + 1) * lineHeight + totalPadding), { width: baseCol * 2 })
            .text(total.toString().padStart(12, " "), col4, 230 + ((count + 1) * lineHeight + totalPadding));*/
    }
}