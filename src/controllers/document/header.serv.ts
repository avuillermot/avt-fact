import moment = require("moment");

export class SellerPart {
    public name: string = "";
    public address1: string = "";
    public address2: string = "";
    public address3: string = "";
    public zipCode: string = "";
    public city: string = "";
    public country: string = "";
    public email: string = "";
    public phone: string = "";
    public id1: string = "";
    public id2: string = "";
    public id3: string = "";
};
export class InvoiceAddressPart {
    public firstName: string = "";
    public lastName: string = "";
    public address1: string = "";
    public address2: string = "";
    public address3: string = "";
    public zipCode: string = "";
    public city: string = "";
    public country: string = "";
};
export class CustomerAddressPart {
    public firstName: string = "";
    public lastName: string = "";
    public address1: string = "";
    public address2: string = "";
    public address3: string = "";
    public zipCode: string = "";
    public city: string = "";
    public country: string = "";
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
    public headerHeight: number = 150;

    public constructor(document: any) {
        this.document = document;
    }

    public async setProviderPart(params: SellerPart): Promise<void> {

        let x: number = this.margeX;
        let y: number = 50;
        this.document.rect(45, 45, this.margeX + 200, this.headerHeight);

        // provider part
        this.document.font(this.defaultFontBold)
            .fontSize(8)
            .text(params.name, x, y).font(this.defaultFont);
        y = y + this.interval;

        this.document.text(params.id1, x, y);
        y = y + this.interval;
        
        if (params.id2 != "" && params.id2 != undefined && params.id2 != null) {
            this.document.text(params.id2, x, y);
            y = y + this.interval;
        }
        if (params.id3 != "" && params.id3 != undefined && params.id3 != null) {
            this.document.text(params.id3, x, y);
            y = y + this.interval;
        }
        y = y + this.interval;

        this.document.text(params.address1, x, y);
        y = y + this.interval;

        if (params.address2 != "" && params.address2 != undefined && params.address2 != null) {
            this.document.text(params.address2, x, y);
            y = y + this.interval;
        }
        if (params.address3 != "" && params.address3 != undefined && params.address3 != null) {
            this.document.text(params.address3, x, y);
            y = y + this.interval;
        }
        this.document.text(params.zipCode + ", " + params.city, x, y);
        y = y + this.interval;
        if (params.country != "" && params.country != undefined && params.country != null) {
            this.document.text(params.country, x, y);
            y = y + this.interval;
        }

        y = y + this.interval;

        if (params.email != "" && params.email != undefined && params.email != null) {
            this.document.text(params.email, x, y);
            y = y + this.interval;
        }

        if (params.phone != "" && params.phone != undefined && params.phone != null) {
            this.document.text(params.phone, x, y);
            y = y + this.interval;
        }
    }

    public async setAddressPart(params: InvoiceAddressPart): Promise<void> {
        let x: number = this.margeX + 250;
        let y: number = 50;
        this.document.rect(295, 45, 130, this.headerHeight);

        this.document.text(params.firstName + " " + params.lastName, x, y)
        y = y + this.interval;

        this.document.text(params.address1, x, y);
        y = y + this.interval;

        if (params.address2 != "" && params.address2 != undefined && params.address2 != null) {
            this.document.text(params.address2, x, y);
            y = y + this.interval;
        }
        if (params.address3 != "" && params.address3 != undefined && params.address3 != null) {
            this.document.text(params.address3, x, y);
            y = y + this.interval;
        }
        this.document.text(params.zipCode + ", " + params.city, x, y);
        y = y + this.interval;
        if (params.country != "" && params.country != undefined && params.country != null) {
            this.document.text(params.country, x, y);
            y = y + this.interval;
        }
    }

    public async setCustomerAddressPart(params: CustomerAddressPart): Promise<void> {
        let x: number = this.margeX + 380;
        let y: number = 50;
        this.document.rect(425, 45, 135, this.headerHeight);
        
        this.document.text(params.firstName + " " + params.lastName, x, y)
        y = y + this.interval;

        this.document.text(params.address1, x, y);
        y = y + this.interval;

        if (params.address2 != "" && params.address2 != undefined && params.address2 != null) {
            this.document.text(params.address2, x, y);
            y = y + this.interval;
        }
        if (params.address3 != "" && params.address3 != undefined && params.address3 != null) {
            this.document.text(params.address3, x, y);
            y = y + this.interval;
        }
        this.document.text(params.zipCode + ", " + params.city, x, y);
        y = y + this.interval;
        if (params.country != "" && params.country != undefined && params.country != null) {
            this.document.text(params.country, x, y);
            y = y + this.interval;
        }
    }

    public async setReferencePart(params: InvoiceReferencePart, additionals: string[]): Promise<void> {

        let x: number = this.margeX + 140;
        let y: number = 50;

        this.document.fontSize(8).font(this.defaultFontBold).text("N°: " + params.invoiceNumber, x, y).font(this.defaultFont);
        y = y + this.interval;
        this.document.text("Edité le : " + moment(params.invoiceDate).locale("fr").format("L"), x, y);
        y = y + this.interval;

        if (additionals != null) {
            for (var i = 0; i < additionals.length; i++) {
                this.document.text(additionals[i], x, y);
                y = y + this.interval;
            }
        }
    }
}