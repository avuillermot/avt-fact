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
    public siren: string = "";
    public siret: string = "";
    public codeAPE: string = "";
    public codeTVA: string = "";
    public legalType: string = "";
    public capital: number = 0;
};
export class BillingAddressPart {
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
export class BillingReferencePart {
    public number: string = "";
    public date: Date = new Date();
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
        this.document.rect(45, 45, this.margeX + 190, this.headerHeight);

        // provider part
        this.document.font(this.defaultFontBold)
            .fontSize(8)
            .text(params.name, x, y).font(this.defaultFont);
        y = y + this.interval;

        this.document.fontSize(6).text("Siret: " + params.siret, x, y);
        y = y + (this.interval - 4);

        if (params.siren != "" && params.siren != undefined && params.siren != null) {
            this.document.fontSize(6).text("Siren: " + params.siren, x, y);
            y = y + (this.interval - 4);
        }

        if (params.legalType != "" && params.legalType != undefined && params.legalType != null) {
            this.document.fontSize(6).text(params.legalType + " au capital de " + params.capital.toString() + "€");
            y = y + (this.interval - 4);
        }
        
        if (params.codeAPE != "" && params.codeAPE != undefined && params.codeAPE != null) {
            this.document.fontSize(6).text("Code APE: " + params.codeAPE, x, y);
            y = y + (this.interval - 4);
        }
        if (params.codeTVA != "" && params.codeTVA != undefined && params.codeTVA != null) {
            this.document.fontSize(6).text("Code TVA: " + params.codeTVA, x, y);
            y = y + (this.interval - 4);
        }
        y = y + this.interval;

        this.document.fontSize(8).text(params.address1, x, y);
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

    public async setAddressPart(params: BillingAddressPart): Promise<void> {
        let x: number = this.margeX + 240;
        let y: number = 50;
        this.document.rect(285, 45, 130, this.headerHeight);

        this.document.font(this.defaultFontBold).fontSize(8).text("Adresse de facturation :", x, y)
        y = y + this.interval;

        this.document.font(this.defaultFont).fontSize(8).text(params.firstName + " " + params.lastName, x, y)
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
        let x: number = this.margeX + 370;
        let y: number = 50;
        this.document.rect(415, 45, 145, this.headerHeight);

        this.document.font(this.defaultFontBold).fontSize(8).text("Client :", x, y)
        y = y + this.interval;

        this.document.font(this.defaultFont).fontSize(8).text(params.firstName + " " + params.lastName, x, y)
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

    public async setReferencePart(params: BillingReferencePart, additionals: string[]): Promise<void> {

        let x: number = this.margeX + 140;
        let y: number = 50;

        this.document.fontSize(8).font(this.defaultFontBold).text("N°: " + params.number, x, y).font(this.defaultFont);
        y = y + this.interval;
        this.document.text("Edité le : " + moment(params.date).locale("fr").format("L"), x, y);
        y = y + this.interval;

        if (additionals != null) {
            for (var i = 0; i < additionals.length; i++) {
                this.document.text(additionals[i], x, y);
                y = y + this.interval;
            }
        }
    }
}