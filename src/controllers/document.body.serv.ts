import { IItemInvoice } from "../models/invoice/itemInvoice";

export abstract class DocumentBodyService {

    document: any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";

    public constructor(document: any) {
        this.document = document;
    }

    public async setTitle(title: string): Promise<void> {
        this.document.fontSize(8).font(this.defaultFont).text(title, (this.width / 2) - 30, 210);
    }

    public async setDetails(params: { taxAmount: string, total: string },items: IItemInvoice[]): Promise<void> {
        
        let baseCol: number = this.width / 7 - 20;
        let col1: number = this.margeX;
        let col2: number = baseCol * 2;
        let col3: number = baseCol * 3;
        let col4: number = baseCol * 4;
        let col5: number = baseCol * 5;
        let col6: number = baseCol * 6;
        let col7: number = baseCol * 7;

        let lineHeight: number = 35;

        this.document.fontSize(8).font(this.defaultFont)
            .text("Article", col1, 240)
            .text("Quantité", col2, 240)
            .text("Prix unitaire", col3, 240)
            .text("Total hors taxe", col4, 240)
            .text("Montant taxe", col5, 240)
            .text("% TVA", col6, 240)
            .text("Total", col7, 240);

        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            let y = 230 + ((i + 1) * lineHeight);
            this.document.rect(45, 215 + ((i + 1) * lineHeight), 515, lineHeight).lineWidth(0).stroke();

            this.document.fontSize(8).font(this.defaultFont)
                .text(item.productName.padEnd(190, " "), col1, y)
                .text(item.quantity.toString(), col2, y)
                .text(item.price.toString().padStart(12, " "), col3, y)
                .text(item.totalFreeTax.toString(), col4, y)
                .text(item.taxAmount.toString(), col5, y)
                .text(item.taxPercent.toString(), col6, y)
                .text(item.total.toString(), col7, y);
        }

        let line: number = 2;
        let y = 230 + ((items.length + line) * lineHeight);
        this.document.rect(col5, 215 + ((i + line) * lineHeight), 515 - col4 - 20, lineHeight).lineWidth(0).stroke();

        this.document.fontSize(8).font(this.defaultFont)
            .text("TVA €", col6, y)
            .text(params.taxAmount, col7, y);

        line++;
        y = 230 + ((items.length + line) * lineHeight);
        this.document.rect(col5, 215 + ((i + line) * lineHeight), 515 - col4 - 20, lineHeight).lineWidth(0).stroke();

        this.document.fontSize(8).font(this.defaultFont)
            .text("TOTAL €", col6, y)
            .text(params.total, col7, y);
    }
}