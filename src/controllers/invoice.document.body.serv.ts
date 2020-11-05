import { IInvoice } from '../models/invoice';

export class InvoiceBodyService {

    document:any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";

    public constructor(document:any) {
        this.document = document;
    }

    public async generateTitle(invoice: IInvoice): Promise<void> {
        this.document.fontSize(8).font(this.defaultFont).text("FACTURE", (this.width / 2) -30, 210);
    }

    public async generateDetails(invoice: IInvoice): Promise<void> {

        let baseCol: number = this.width / 6 - 30;
        let col1: number = this.margeX;
        let col2: number = baseCol * 2;
        let col3: number = baseCol * 3;
        let col4: number = baseCol * 4;
        let col5: number = baseCol * 5;
        let col6: number = baseCol * 6;

        let lineHeight: number = 35;

        this.document.fontSize(8).font(this.defaultFont)
            .text("Article", col1, 240)
            .text("Quantité", col2, 240)
            .text("Prix unitaire", col3, 240)
            .text("Total hors taxe", col4, 240)
            .text("Montant taxe", col5, 240)
            .text("Total", col6, 240);

        for (var i = 0; i < invoice.items.length; i++) {
            let item = invoice.items[i];
            let y = 230 + ((i + 1) * lineHeight);
            this.document.rect(45, 215 + ((i + 1) * lineHeight), 515, lineHeight).lineWidth(0).stroke();

            this.document.fontSize(8).font(this.defaultFont)
                .text(item.productCode.padEnd(190, " "), col1, y)
                .text(item.quantity.toString(), col2, y)
                .text(item.price.toString().padStart(12, " "), col3, y)
                .text(item.totalFreeTax.toString(), col4, y)
                .text(item.taxAmount.toString(), col5, y)
                .text(item.total.toString(), col6, y);
        }

        let y = 230 + ((invoice.items.length + 1) * lineHeight);
        this.document.rect(45, 215 + ((i + 1) * lineHeight), 515, lineHeight).lineWidth(0).stroke();

        this.document.fontSize(8).font(this.defaultFont)
            .text("TOTAL €", col5, y)
            .text(invoice.total.toString(), col6, y);
    }
}