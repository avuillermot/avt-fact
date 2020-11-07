import PDFDocument = require('pdfkit');
import fs = require("fs");
import moment = require("moment");
import Quote, { IQuote } from '../models/quote/quote';
import { IStatusInvoice } from "../models/invoice/statusInvoice";
import { DocumentService, IDocumentService } from "./document.serv";
import { QuoteHeaderService } from "./quote.document.header.serv";
import { QuoteBodyService } from './quote.document.body.serv';
import { QuoteFooterService } from './quote.document.footer.serv';
import { v4 as uuid } from 'uuid';

export class QuoteService extends DocumentService implements IDocumentService<IQuote> {
    servDocumentHeader: QuoteHeaderService;
    servDocumentBody: QuoteBodyService;
    servDocumentFooter: QuoteFooterService;

    public constructor(pdfRepository: string) {
        super();
        this.document = new PDFDocument;
        this.servDocumentHeader = new QuoteHeaderService(this.document);
        this.servDocumentHeader.margeX = this.margeX;
        this.servDocumentHeader.width = this.width;
        this.servDocumentHeader.defaultFont = this.defaultFont;
        this.servDocumentHeader.defaultFontBold = this.defaultFontBold;

        this.servDocumentBody = new QuoteBodyService(this.document);
        this.servDocumentBody.margeX = this.margeX;
        this.servDocumentBody.width = this.width;
        this.servDocumentBody.defaultFont = this.defaultFont;
        this.servDocumentBody.defaultFontBold = this.defaultFontBold;

        this.servDocumentFooter = new QuoteFooterService(this.document);
        this.servDocumentFooter.margeX = this.margeX;
        this.servDocumentFooter.width = this.width;
        this.servDocumentFooter.defaultFont = this.defaultFont;
        this.servDocumentFooter.defaultFontBold = this.defaultFontBold;

        this.pdfRepository = pdfRepository;
    }

    public async createAndSave(quote: IQuote): Promise<{ id: string, hasError: boolean, filename: string }> {
        let id = uuid();
        let filename = id + ".pdf";
        quote.fileName = filename;
        
        quote.statusHistory = new Array<IStatusInvoice>();
        quote.statusHistory.push(<IStatusInvoice>{ status: "CREATE" });
        
        let saved = await Quote.create(quote);

        let back = await this.createPDF(saved, { annotation: false, annotationText: "" });
        back.id = saved.id;

        return back;
    }

    public async duplicatePdf(invoiceid: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back: { id: string, hasError: boolean, filename: string } = { id: "", hasError: false, filename: "" };
        let current: IQuote = <IQuote>await Quote.findOne({ _id: invoiceid });
        if (current != null) {
            current.fileName = current.fileName.replace(".pdf", "").replace(".PDF", "") + "-" + moment().unix() + ".pdf";
            back = await this.createPDF(current, { annotation: true, annotationText: "Duplicata" });
        }
        else back.hasError = true;
        back.id = invoiceid;
        return back;
    }

    private async createPDF(quote: IQuote, params: { annotation: boolean, annotationText: string }): Promise<{ id: string, hasError: boolean, filename: string }> {
        
        let hasError = false;
        let path = this.pdfRepository + quote.fileName;
        this.document.pipe(fs.createWriteStream(path));
        
        try {
            this.generateHeader(quote);

            this.document.rect(45, 200, 515, 30).lineWidth(0).stroke();
            this.servDocumentBody.generateTitle(quote);
            this.servDocumentBody.generateDetails(quote);

            this.servDocumentFooter.generateFooter(quote);

            //this.generateFooter(invoice);

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

        return { id: "", hasError: hasError, filename: quote.fileName };
    }

    private async generateHeader(quote: IQuote): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(quote);
        this.servDocumentHeader.generateInvoiceAddressPart(quote);
        this.servDocumentHeader.generateCustomerAddressPart(quote);
        this.servDocumentHeader.generateReference(quote);
    }
}