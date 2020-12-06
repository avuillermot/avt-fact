import PDFDocument = require('pdfkit');
import fs = require("fs");
import moment = require("moment");
import Entity, { IEntity } from "./../models/entity/entity";
import Quote, { IQuote } from '../models/document/quote';
import { IStatus } from "../models/document/status";
import { DocumentService, IDocumentService } from "./document/document.serv";
import { QuoteHeaderService } from "./document/quote.header.serv";
import { QuoteBodyService } from './document/quote.body.serv';
import { QuoteFooterService } from './document/quote.footer.serv';

export class QuoteDocumentService extends DocumentService implements IDocumentService<IQuote> {
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

    public async get(params: IQuote): Promise<IQuote[]> {
        let result: IQuote[] = await Quote.find(params);
        return result;
    }

    // Create a PDF file from a quote
    public async create(quote: IQuote, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string, message: string }> {
        delete quote._id;
        delete quote.id;
        
        let back: { id: string, hasError: boolean, filename: string, message: string } = { id: "", hasError: false, filename: "", message: "" };

        let seller: IEntity = <IEntity>await Entity.findOne({ _id: sellerId });

        if (seller != null && seller != undefined) {
            quote.statusHistory = new Array<IStatus>();
            quote.statusHistory.push(<IStatus>{ status: "CREATE", created: moment().utc().toDate(), updated: moment().utc().toDate(), createdBy: quote.createdBy, updatedBy: quote.createdBy });
            quote.seller = seller;
            quote.number = this.getNumDocument("DE");

            if (quote.address1 == null || quote.address1 == "") quote.address1 = quote.seller.address1;
            if (quote.address2 == null || quote.address2 == "") quote.address2 = quote.seller.address2;
            if (quote.address3 == null || quote.address3 == "") quote.address3 = quote.seller.address3;
            if (quote.zipCode == null || quote.zipCode == "") quote.zipCode = quote.seller.zipCode;
            if (quote.city == null || quote.city == "") quote.city = quote.seller.city;
            if (quote.country == null || quote.country == "") quote.country = quote.seller.country;
            if (quote.entityId == null || quote.entityId == "") quote.entityId = sellerId;

            try {
                console.log(quote);
                let saved = await Quote.create(quote);
                let result = await Quote.updateOne({ _id: saved._id }, { fileName: saved._id + ".pdf" });
                saved.fileName = saved._id + ".pdf";

                back = await this.createFilePDF(saved, { annotation: false, annotationText: "" });
                back.id = saved._id;
            }
            catch (ex) {
                console.log(ex);
                back.hasError = true;
                back.message = ex.toString()
            }
        }
        else {
            back.hasError = true;
        }
        return back;
    }

    private async change(quote: IQuote, sellerId: string, status: string): Promise<{ id: string, hasError: boolean, filename: string, message: string }> {
        let back: { id: string, hasError: boolean, filename: string, message: string } = { id: "", hasError: false, filename: "", message: "" };

        let seller: IEntity = <IEntity>await Entity.findOne({ _id: sellerId });

        if (seller != null && seller != undefined) {
            quote.seller = seller;

            quote.statusHistory.push(<IStatus>{ status: status, created: moment().utc().toDate(), updated: moment().utc().toDate(), createdBy: quote.updatedBy, updatedBy: quote.updatedBy });
            quote.status = status;

            if (quote._id == null || quote._id == undefined) quote._id = quote._id;
            if (quote.address1 == null || quote.address1 == "") quote.address1 = quote.seller.address1;
            if (quote.address2 == null || quote.address2 == "") quote.address2 = quote.seller.address2;
            if (quote.address3 == null || quote.address3 == "") quote.address3 = quote.seller.address3;
            if (quote.zipCode == null || quote.zipCode == "") quote.zipCode = quote.seller.zipCode;
            if (quote.city == null || quote.city == "") quote.city = quote.seller.city;
            if (quote.country == null || quote.country == "") quote.country = quote.seller.country;
            if (quote.entityId == null || quote.entityId == "") quote.entityId = sellerId;

            try {
                await Quote.updateOne({ _id: quote._id }, quote);

                back = await this.createFilePDF(quote, { annotation: false, annotationText: "" });
            }
            catch (ex) {
                console.log(ex);
                back.hasError = true;
                back.message = ex.toString()
            }
        }
        else {
            back.hasError = true;
        }
        return back;
    }

    // update & a PDF file from a quote
    public async update(quote: IQuote, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string, message: string }> {
        const read: IQuote | null = await Quote.findById(quote._id);
        if (read != null) {
            if (read.status == 'LOCK') throw new Error("Un devis edité ne peut pas être mis à jour");
        }
        return await this.change(quote, sellerId, 'UPDATE');
    }

    public async lock(quote: IQuote, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string, message: string }> {
        const read: IQuote | null = await Quote.findById(quote._id);
        if (read != null) {
            if (read.status == 'LOCK') throw new Error("Devis déjà édité");
        }
        return await this.change(quote, sellerId, 'LOCK');
    }

    public async duplicatePdf(quoteid: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back: { id: string, hasError: boolean, filename: string } = { id: "", hasError: false, filename: "" };
        let current: IQuote = <IQuote>await Quote.findOne({ _id: quoteid });
        if (current != null) {
            current.fileName = current.fileName.replace(".pdf", "").replace(".PDF", "") + "-" + moment().unix() + ".pdf";
            back = await this.createFilePDF(current, { annotation: true, annotationText: "DUPLICATA" });
        }
        else back.hasError = true;
        back.id = quoteid;
        return back;
    }

    private async createFilePDF(quote: IQuote, params: { annotation: boolean, annotationText: string }): Promise<{ id: string, hasError: boolean, filename: string, message: string }> {
        
        let path = this.pdfRepository + quote.fileName;
        let exist: boolean = await fs.existsSync(path);
        if (exist) await fs.unlinkSync(path);
        this.document.pipe(fs.createWriteStream(path));
        
        const back = { id: quote._id, hasError: false, filename: quote.fileName, message: "" }
        try {
            if (params.annotation) {
                this.document.text(params.annotationText, 10, 10);
            }
            this.generateHeader(quote);

            this.document.rect(45, 200, 515, 30).lineWidth(0).stroke();
            this.servDocumentBody.generateTitle(quote);
            this.servDocumentBody.generate(quote);

            this.servDocumentFooter.generate(quote);

            this.document.moveDown();
            await this.document.end();

            await new Promise(resolve => setTimeout(resolve, 2000)); // 3 sec
        }
        catch (ex) {
            back.hasError = true;
            console.log(ex);
        }
        
        if (back.hasError) {
            fs.unlink(path, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted! : ' + path);
            });
        }

        return back;
    }

    private async generateHeader(quote: IQuote): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(quote);
        this.servDocumentHeader.generateQuoteAddressPart(quote);
        this.servDocumentHeader.generateCustomerAddressPart(quote);
        this.servDocumentHeader.generateReference(quote);
    }
}