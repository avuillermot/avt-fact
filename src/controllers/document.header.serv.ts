import moment = require("moment");

export class ProviderPart {
    public providerName: string = "";
    public providerAddress1: string = "";
    public providerAddress2: string = "";
    public providerAddress3: string = "";
    public providerZipCode: string = "";
    public providerCity: string = "";
    public providerCountry: string = "";
    public providerEmail: string = "";
    public providerPhone: string = "";
};
export class InvoiceAddressPart {
    public invoiceLabel: string = "";
    public customerName: string = "";
    public invoiceAddress1: string = "";
    public invoiceAddress2: string = "";
    public invoiceAddress3: string = "";
    public invoiceZipCode: string = "";
    public invoiceCity: string = "";
    public invoiceCountry: string = "";
};
export class CustomerAddressPart {
    public customerLabel: string = "";
    public customerName: string = "";
    public customerAddress1: string = "";
    public customerAddress2: string = "";
    public customerAddress3: string = "";
    public customerZipCode: string = "";
    public customerCity: string = "";
    public customerCountry: string = "";
};
export class InvoiceReferencePart {
    public invoiceNumber: string = "";
    public invoiceDate: Date = new Date();
};

export abstract class DocumentHeaderService {

    protected document: any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";
    public interval: number = 11;
    public headerHeight: number = 120;

    public constructor(document: any) {
        this.document = document;
    }

    public async setProviderPart(params: ProviderPart): Promise<void> {

        let x: number = this.margeX;
        let y: number = 50;
        this.document.rect(45, 45, this.margeX + 200, this.headerHeight);

        // provider part
        this.document.font(this.defaultFontBold)
            .fontSize(8)
            .text(params.providerName, x, y).font(this.defaultFont);
        y = y + this.interval;

        this.document.text(params.providerAddress1, x, y);
        y = y + this.interval;

        if (params.providerAddress2 != "") {
            this.document.text(params.providerAddress2, x, y);
            y = y + this.interval;
        }
        if (params.providerAddress3 != "") {
            this.document.text(params.providerAddress3, x, y);
            y = y + this.interval;
        }
        this.document.text(params.providerZipCode + ", " + params.providerCity, x, y);
        y = y + this.interval;
        if (params.providerCountry != "") {
            this.document.text(params.providerCountry, x, y);
            y = y + this.interval;
        }

        y = y + this.interval;

        if (params.providerEmail != "") {
            this.document.text(params.providerEmail, x, y);
            y = y + this.interval;
        }

        if (params.providerPhone != "") {
            this.document.text(params.providerPhone, x, y);
            y = y + this.interval;
        }
    }

    public async setAddressPart(params: InvoiceAddressPart): Promise<void> {
        let x: number = this.margeX + 250;
        let y: number = 50;
        this.document.rect(295, 45, 130, this.headerHeight);

        this.document.fontSize(8).text(params.invoiceLabel, x, y, { underline: true });
        y = y + this.interval;

        this.document.text(params.customerName, x, y)
        y = y + this.interval;

        this.document.text(params.invoiceAddress1, x, y);
        y = y + this.interval;

        if (params.invoiceAddress2 != "") {
            this.document.text(params.invoiceAddress2, x, y);
            y = y + this.interval;
        }
        if (params.invoiceAddress3 != "") {
            this.document.text(params.invoiceAddress3, x, y);
            y = y + this.interval;
        }
        this.document.text(params.invoiceZipCode + ", " + params.invoiceCity, x, y);
        y = y + this.interval;
        if (params.invoiceCountry != "") {
            this.document.text(params.invoiceCountry, x, y);
            y = y + this.interval;
        }
    }

    public async setCustomerAddressPart(params: CustomerAddressPart): Promise<void> {
        let x: number = this.margeX + 380;
        let y: number = 50;
        this.document.rect(425, 45, 135, this.headerHeight);

        this.document.fontSize(8).text(params.customerLabel, x, y, { underline: true });
        y = y + this.interval;

        this.document.text(params.customerName, x, y)
        y = y + this.interval;

        this.document.text(params.customerAddress1, x, y);
        y = y + this.interval;

        if (params.customerAddress2 != "") {
            this.document.text(params.customerAddress2, x, y);
            y = y + this.interval;
        }
        if (params.customerAddress3 != "") {
            this.document.text(params.customerAddress3, x, y);
            y = y + this.interval;
        }
        this.document.text(params.customerZipCode + ", " + params.customerCity, x, y);
        y = y + this.interval;
        if (params.customerCountry != "") {
            this.document.text(params.customerCountry, x, y);
            y = y + this.interval;
        }
    }

    public async setReferencePart(params: InvoiceReferencePart, additionals: string[]): Promise<void> {

        let x: number = this.margeX + 140;
        let y: number = 50;

        this.document.fontSize(8).font(this.defaultFontBold).text("N�: " + params.invoiceNumber, x, y).font(this.defaultFont);
        y = y + this.interval;
        this.document.text("Edit� le : " + moment(params.invoiceDate).locale("fr").format("L"), x, y);
        y = y + this.interval;

        if (additionals != null) {
            for (var i = 0; i < additionals.length; i++) {
                this.document.text(additionals[i], x, y);
                y = y + this.interval;
            }
        }
    }
}