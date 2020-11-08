import PDFDocument = require('pdfkit');
import fs = require("fs");
import moment = require("moment");
import { DocumentService, IDocumentService } from "./document/document.serv";
import Invoice, { IInvoice } from '../models/invoice/invoice';
import { InvoiceHeaderService } from "./document/invoice.header.serv";
import { InvoiceBodyService } from './document/invoice.body.serv';
import { InvoiceFooterService } from './document/invoice.footer.serv';
import { v4 as uuid } from 'uuid';
import { IStatusInvoice } from '../models/invoice/statusInvoice';

export class InvoiceService extends DocumentService implements IDocumentService<IInvoice> {
    
    servDocumentHeader: InvoiceHeaderService;
    servDocumentBody: InvoiceBodyService;
    servDocumentFooter: InvoiceFooterService;

    public constructor(pdfRepository: string) {
        super();
        this.document = new PDFDocument;
        this.servDocumentHeader = new InvoiceHeaderService(this.document);
        this.servDocumentHeader.margeX = this.margeX;
        this.servDocumentHeader.width = this.width;
        this.servDocumentHeader.defaultFont = this.defaultFont;
        this.servDocumentHeader.defaultFontBold = this.defaultFontBold;

        this.servDocumentBody = new InvoiceBodyService(this.document);
        this.servDocumentBody.margeX = this.margeX;
        this.servDocumentBody.width = this.width;
        this.servDocumentBody.defaultFont = this.defaultFont;
        this.servDocumentBody.defaultFontBold = this.defaultFontBold;

        this.servDocumentFooter = new InvoiceFooterService(this.document);
        this.servDocumentFooter.margeX = this.margeX;
        this.servDocumentFooter.width = this.width;
        this.servDocumentFooter.defaultFont = this.defaultFont;
        this.servDocumentFooter.defaultFontBold = this.defaultFontBold;

        this.pdfRepository = pdfRepository;
    }

    public async createAndSave(invoice: IInvoice): Promise<{ id: string, hasError: boolean, filename: string }> {
        console.log("222222");
        let id = uuid();
        let filename = id + ".pdf";
        invoice.fileName = filename;

        invoice.statusHistory = new Array<IStatusInvoice>();
        invoice.statusHistory.push(<IStatusInvoice>{ status: "CREATE" });
        console.log("33333333");

        try {
            let saved = await Invoice.create(invoice);
            console.log("creation");
            let back = await this.createPDF(saved, { annotation: false, annotationText: "" });
            back.id = saved.id;
            return back;
        }
        catch (ex) {
            console.log(ex);
        }

        return { id: "string", hasError: true, filename: "string" };
    }

    public async duplicatePdf(invoiceid: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back: { id: string, hasError: boolean, filename: string } = { id: "", hasError: false, filename: "" };
        let current: IInvoice = <IInvoice>await Invoice.findOne({ _id: invoiceid });
        if (current != null) {
            current.fileName = current.fileName.replace(".pdf","").replace(".PDF","") + "-" + moment().unix() + ".pdf";
            back = await this.createPDF(current, { annotation: true, annotationText:"Duplicata" });
        }
        else back.hasError = true;
        back.id = invoiceid;
        return back;
    }

    private async createPDF(invoice: IInvoice, params:{annotation:boolean, annotationText:string }): Promise<{ id: string, hasError: boolean, filename: string }> {

        let hasError = false;
        let path = this.pdfRepository + invoice.fileName;
        this.document.pipe(fs.createWriteStream(path));

        try {
            this.generateHeader(invoice);

            this.document.rect(45, 200, 515, 30).lineWidth(0).stroke();
            this.servDocumentBody.generateTitle(invoice);
            this.servDocumentBody.generateDetails(invoice);

            this.servDocumentFooter.generateFooter(invoice);

            if (params.annotation) {
                this.document.text("Duplicata", 200, 200);
            }
            this.document.moveDown();
            await this.document.end();

            await new Promise(resolve => setTimeout(resolve, 2000)); // 3 sec

        }
        catch (ex) {
            hasError = true;
            console.log(ex);
        }

        if (hasError) {
            fs.unlink(path, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted! : ' + path);
            }); 
        }
        
        return { id: "", hasError: hasError, filename: invoice.fileName };
    }

    private async generateHeader(invoice: IInvoice): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(invoice);
        this.servDocumentHeader.generateInvoiceAddressPart(invoice);
        this.servDocumentHeader.generateCustomerAddressPart(invoice);
        this.servDocumentHeader.generateReference(invoice);
    }
}