import PDFDocument = require('pdfkit');
import fs = require("fs");
import moment = require("moment");
import Entity, { IEntity } from "./../models/entity/entity";
import { DocumentService, IDocumentService } from "./document/document.serv";
import SalesReceipt, { ISalesReceipt } from '../models/document/salesReceipt';
import { SalesReceiptHeaderService } from "./document/salesReceipt.header.serv";
import { SalesReceiptBodyService } from './document/salesReceipt.body.serv';
import { SalesReceiptFooterService } from './document/salesReceipt.footer.serv';
import { IStatus } from '../models/document/status';

export class SalesReceiptService extends DocumentService implements IDocumentService<ISalesReceipt> {
    
    servDocumentHeader: SalesReceiptHeaderService;
    servDocumentBody: SalesReceiptBodyService;
    servDocumentFooter: SalesReceiptFooterService;

    public constructor(pdfRepository: string) {
        super();
        this.document = new PDFDocument;
        this.servDocumentHeader = new SalesReceiptHeaderService(this.document);
        this.servDocumentHeader.margeX = this.margeX;
        this.servDocumentHeader.width = this.width;
        this.servDocumentHeader.defaultFont = this.defaultFont;
        this.servDocumentHeader.defaultFontBold = this.defaultFontBold;

        this.servDocumentBody = new SalesReceiptBodyService(this.document);
        this.servDocumentBody.margeX = this.margeX;
        this.servDocumentBody.width = this.width;
        this.servDocumentBody.defaultFont = this.defaultFont;
        this.servDocumentBody.defaultFontBold = this.defaultFontBold;

        this.servDocumentFooter = new SalesReceiptFooterService(this.document);
        this.servDocumentFooter.margeX = this.margeX;
        this.servDocumentFooter.width = this.width;
        this.servDocumentFooter.defaultFont = this.defaultFont;
        this.servDocumentFooter.defaultFontBold = this.defaultFontBold;

        this.pdfRepository = pdfRepository;
    }

    public async createAndSave(sales: ISalesReceipt, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back: { id: string, hasError: boolean, filename: string } = { id: "", hasError: false, filename: "" };

        let seller: IEntity = <IEntity>await Entity.findOne({ _id: sellerId });
        if (seller != null && seller != undefined) {
            sales.statusHistory = new Array<IStatus>();
            sales.statusHistory.push(<IStatus>{ status: "CREATE" });
            sales.seller = seller;

            let saved = await SalesReceipt.create(sales);
            let result = await SalesReceipt.updateOne({ _id: saved.id }, { fileName: saved.id + ".pdf" });
            saved.fileName = saved.id + ".pdf";
         
            back = await this.createPDF(saved, { annotation: false, annotationText: "" });
        }
        else {
            back.hasError = true;
        }
        return back;
    }

    public async duplicatePdf(id: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back: { id: string, hasError: boolean, filename: string } = { id: "", hasError: false, filename: "" };
        let current: ISalesReceipt = <ISalesReceipt>await SalesReceipt.findOne({ _id: id });
        if (current != null) {
            current.fileName = current.fileName.replace(".pdf","").replace(".PDF","") + "-" + moment().unix() + ".pdf";
            back = await this.createPDF(current, { annotation: true, annotationText:"Duplicata" });
        }
        else back.hasError = true;
        back.id = id;
        return back;
    }

    private async createPDF(sales: ISalesReceipt, params:{annotation:boolean, annotationText:string }): Promise<{ id: string, hasError: boolean, filename: string }> {

        let hasError = false;
        let path = this.pdfRepository + sales.fileName;
        this.document.pipe(fs.createWriteStream(path));

        try {
            if (params.annotation) {
                this.document.text(params.annotationText, 10, 10);
            }
            this.generateHeader(sales);

            this.document.rect(45, 200, 515, 30).lineWidth(0).stroke();
            this.servDocumentBody.generateTitle(sales);
            this.servDocumentBody.generateDetails(sales);

            this.servDocumentFooter.generateFooter(sales);

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
        
        return { id: sales.id, hasError: hasError, filename: sales.fileName };
    }

    private async generateHeader(sales: ISalesReceipt): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(sales);
        this.servDocumentHeader.generateSalesReceiptAddressPart(sales);
        this.servDocumentHeader.generateCustomerAddressPart(sales);
        this.servDocumentHeader.generateReference(sales);
    }
}