//import mongoose from 'mongoose';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { IInvoice } from '../models/invoice.document';
import ServInvoiceHeader from "../controllers/invoice.document.header.serv";
import ServInvoiceBody from '../controllers/invoice.document.body.serv';
import ServInvoiceFooter from '../controllers/invoice.document.footer';
import { v4 as uuid } from 'uuid';

export default class DefaultInvoice {
    
    document: any;
    margeX: number = 50;
    width: number = 610;
    defaultFont: string = "Helvetica";
    defaultFontBold: string = "Helvetica-Bold";
    servDocumentHeader: ServInvoiceHeader;
    servDocumentBody: ServInvoiceBody;
    servDocumentFooter: ServInvoiceFooter;

    public pdfRepository: string = "";

    public constructor() {
        console.log("constructor");
        this.document = new PDFDocument();

        this.servDocumentHeader = new ServInvoiceHeader(this.document);
        this.servDocumentHeader.margeX = this.margeX;
        this.servDocumentHeader.width = this.width;
        this.servDocumentHeader.defaultFont = this.defaultFont;
        this.servDocumentHeader.defaultFontBold = this.defaultFontBold;

        this.servDocumentBody = new ServInvoiceBody(this.document);
        this.servDocumentBody.margeX = this.margeX;
        this.servDocumentBody.width = this.width;
        this.servDocumentBody.defaultFont = this.defaultFont;
        this.servDocumentBody.defaultFontBold = this.defaultFontBold;

        this.servDocumentFooter = new ServInvoiceFooter(this.document);
        this.servDocumentFooter.margeX = this.margeX;
        this.servDocumentFooter.width = this.width;
        this.servDocumentFooter.defaultFont = this.defaultFont;
        this.servDocumentFooter.defaultFontBold = this.defaultFontBold;
    }

    public async createAndSave(invoice: IInvoice): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back = await this.create(invoice);
        return back;
    }

    public async create(invoice: IInvoice): Promise<{ id: string, hasError: boolean, filename:string }> {
        return await this.createSigned(invoice, false); 
    }

    public async createSigned(invoice: IInvoice, signed: boolean): Promise<{ id: string, hasError: boolean, filename: string }> {

        let hasError = false;
        let id = uuid();
        let filename = id + ".pdf";
        let path = this.pdfRepository + filename;
        this.document.pipe(fs.createWriteStream(path));
        this.generateHeader(invoice);

        /*this.document.moveTo(this.margeX, 200).lineTo(this.width - this.margeX, 200).fill('#000000');

        this.servDocumentBody.generateTitle(invoice);
        this.servDocumentBody.generateDetails(invoice);

        this.document.moveTo(this.margeX, 230).lineTo(this.width - this.margeX, 230).fill('#000000');

        this.servDocumentFooter.generateFooter(invoice);

        this.generateFooter(invoice);*/
        this.document.moveDown();
        this.document.end();

        /*if (hasError) {
            fs.unlink(path, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted! : ' + path);
            }); 
        }*/
        
        return { id: id, hasError: hasError, filename: filename };
    }

    public async generateHeader(invoice: IInvoice): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(invoice);
        /*this.servDocumentHeader.generateInvoiceAddressPart(invoice);
        this.servDocumentHeader.generateCustomerAddressPart(invoice);
        this.servDocumentHeader.generateHeaderInvoiceReference(invoice);*/
    }

    public async generateFooter(invoice: IInvoice):Promise<void> {
        this.document
            .fontSize(10)
            .text(
                "Payment is due within 15 days. Thank you for your business.",
                50,
                700,
                { align: "center", width: 500 }
            );
    }
}