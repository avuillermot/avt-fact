//import PDFDocument from 'pdfkit';
import { IInvoice } from "../models/invoice.document";

export default class InvoiceHeaderDefault {

    private document: any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";

    public constructor(document: any) {
        console.log("constructor2");
        this.document = document;
    }

    public async generateHeaderProviderPart(invoice: IInvoice): Promise<void> {
        let x: number = this.margeX;
        let y: number = 50;
        let interval: number = 11;

        // provider part
        /*this.document
            .fontSize(8)
            .text(invoice.providerName, x, y)
        y = y + interval;

        this.document.text(invoice.providerAddress1, x, y);
        y = y + interval;

        if (invoice.providerAddress2 != "") {
            this.document.text(invoice.providerAddress2, x, y);
            y = y + interval;
        }
        if (invoice.providerAddress3 != "") {
            this.document.text(invoice.providerAddress3, x, y);
            y = y + interval;
        }
        this.document.text(invoice.providerZipCode + ", " + invoice.providerCity, x, y);
        y = y + interval;
        if (invoice.providerCountry != "") {
            this.document.text(invoice.providerCountry, x, y);
            y = y + interval;
        }

        y = y + interval;

        if (invoice.providerEmail != "") {
            this.document.text(invoice.providerEmail, x, y);
            y = y + interval;
        }

        if (invoice.providerPhone != "") {
            this.document.text(invoice.providerPhone, x, y);
            y = y + interval;
        }*/
        console.log(this.document);
        this.document.text("lllllllllllllllllllllll", 100, 100);
        console.log("fin");
    }

    public async generateInvoiceAddressPart(invoice: IInvoice): Promise<void> {
        let x: number = this.margeX + 250;
        let y: number = 100;
        let interval: number = 11;

        this.document.fontSize(8).text(invoice.invoiceLabel, x, y, { underline: true });
        y = y + interval;

        this.document.text(invoice.customerName, x, y)
        y = y + interval;

        this.document.text(invoice.invoiceAddress1, x, y);
        y = y + interval;

        if (invoice.invoiceAddress2 != "") {
            this.document.text(invoice.invoiceAddress2, x, y);
            y = y + interval;
        }
        if (invoice.invoiceAddress3 != "") {
            this.document.text(invoice.invoiceAddress3, x, y);
            y = y + interval;
        }
        this.document.text(invoice.invoiceZipCode + ", " + invoice.invoiceCity, x, y);
        y = y + interval;
        if (invoice.invoiceCountry != "") {
            this.document.text(invoice.invoiceCountry, x, y);
            y = y + interval;
        }
    }

    public async generateCustomerAddressPart(invoice: IInvoice): Promise<void> {
        let x: number = this.margeX + 380;
        let y: number = 100;
        let interval: number = 11;

        this.document.fontSize(8).text(invoice.customerLabel, x, y, { underline: true });
        y = y + interval;

        this.document.text(invoice.customerName, x, y)
        y = y + interval;

        this.document.text(invoice.customerAddress1, x, y);
        y = y + interval;

        if (invoice.customerAddress2 != "") {
            this.document.text(invoice.customerAddress2, x, y);
            y = y + interval;
        }
        if (invoice.customerAddress3 != "") {
            this.document.text(invoice.customerAddress3, x, y);
            y = y + interval;
        }
        this.document.text(invoice.customerZipCode + ", " + invoice.customerCity, x, y);
        y = y + interval;
        if (invoice.customerCountry != "") {
            this.document.text(invoice.customerCountry, x, y);
            y = y + interval;
        }
    }

    public async generateHeaderInvoiceReference(invoice: IInvoice): Promise<void> {

        let x: number = this.margeX + 380;
        let y: number = 50;
        let interval: number = 11;

        this.document.fontSize(8).font(this.defaultFontBold).text(invoice.invoiceNumber, x, y).font(this.defaultFont);
        y = y + interval;
        this.document.text(invoice.invoiceDate, x, y);
        y = y + interval;
        if (invoice.deliveryDate != null) {
            this.document.text(invoice.deliveryDate, x, y);
            y = y + interval;
        }
    }
}