import { IInvoice } from "../models/invoice";
import moment = require("moment");

export class InvoiceHeaderService {

    private document:any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";
    public interval: number = 11;
    public headerHeight: number = 120;

    public constructor(pdf:any) {
        this.document = pdf;
    }

    public async generateHeaderProviderPart(invoice: IInvoice): Promise<void> {

        let x: number = this.margeX;
        let y: number = 50;
        this.document.rect(45, 45, this.margeX + 200, this.headerHeight);

        // provider part
        this.document.font(this.defaultFontBold)
            .fontSize(8)
            .text(invoice.providerName, x, y).font(this.defaultFont);
        y = y + this.interval;

        this.document.text(invoice.providerAddress1, x, y);
        y = y + this.interval;

        if (invoice.providerAddress2 != "") {
            this.document.text(invoice.providerAddress2, x, y);
            y = y + this.interval;
        }
        if (invoice.providerAddress3 != "") {
            this.document.text(invoice.providerAddress3, x, y);
            y = y + this.interval;
        }
        this.document.text(invoice.providerZipCode + ", " + invoice.providerCity, x, y);
        y = y + this.interval;
        if (invoice.providerCountry != "") {
            this.document.text(invoice.providerCountry, x, y);
            y = y + this.interval;
        }

        y = y + this.interval;

        if (invoice.providerEmail != "") {
            this.document.text(invoice.providerEmail, x, y);
            y = y + this.interval;
        }

        if (invoice.providerPhone != "") {
            this.document.text(invoice.providerPhone, x, y);
            y = y + this.interval;
        }
    }

    public async generateInvoiceAddressPart(invoice: IInvoice): Promise<void> {
        let x: number = this.margeX + 250;
        let y: number = 50;
        this.document.rect(295, 45, 130, this.headerHeight);

        this.document.fontSize(8).text(invoice.invoiceLabel, x, y, { underline: true });
        y = y + this.interval;

        this.document.text(invoice.customerName, x, y)
        y = y + this.interval;

        this.document.text(invoice.invoiceAddress1, x, y);
        y = y + this.interval;

        if (invoice.invoiceAddress2 != "") {
            this.document.text(invoice.invoiceAddress2, x, y);
            y = y + this.interval;
        }
        if (invoice.invoiceAddress3 != "") {
            this.document.text(invoice.invoiceAddress3, x, y);
            y = y + this.interval;
        }
        this.document.text(invoice.invoiceZipCode + ", " + invoice.invoiceCity, x, y);
        y = y + this.interval;
        if (invoice.invoiceCountry != "") {
            this.document.text(invoice.invoiceCountry, x, y);
            y = y + this.interval;
        }
    }

    public async generateCustomerAddressPart(invoice: IInvoice): Promise<void> {
        let x: number = this.margeX + 380;
        let y: number = 50;
        this.document.rect(425, 45, 135, this.headerHeight);

        this.document.fontSize(8).text(invoice.customerLabel, x, y, { underline: true });
        y = y + this.interval;

        this.document.text(invoice.customerName, x, y)
        y = y + this.interval;

        this.document.text(invoice.customerAddress1, x, y);
        y = y + this.interval;

        if (invoice.customerAddress2 != "") {
            this.document.text(invoice.customerAddress2, x, y);
            y = y + this.interval;
        }
        if (invoice.customerAddress3 != "") {
            this.document.text(invoice.customerAddress3, x, y);
            y = y + this.interval;
        }
        this.document.text(invoice.customerZipCode + ", " + invoice.customerCity, x, y);
        y = y + this.interval;
        if (invoice.customerCountry != "") {
            this.document.text(invoice.customerCountry, x, y);
            y = y + this.interval;
        }
    }

    public async generateHeaderInvoiceReference(invoice: IInvoice): Promise<void> {

        let x: number = this.margeX + 170;
        let y: number = 50;

        this.document.fontSize(8).font(this.defaultFontBold).text(invoice.invoiceNumber, x, y).font(this.defaultFont);
        y = y + this.interval;
        this.document.text(moment(invoice.invoiceDate).format("L"), x, y);
        y = y + this.interval;
        if (invoice.deliveryDate != null) {
            this.document.text(moment(invoice.invoiceDate).format("L"), x, y);
            y = y + this.interval;
        }
    }
}