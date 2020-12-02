import PDFDocument = require('pdfkit');
import fs = require("fs");
import moment = require("moment");
import Entity, { IEntity } from "./../models/entity/entity";
import PurchaseOrder, { IPurchaseOrder } from '../models/document/purchaseOrder';
import { IStatus } from "../models/document/status";
import { DocumentService, IDocumentService } from "./document/document.serv";
import { PurchaseOrderHeaderService } from "./document/purchaseOrder.header.serv";
import { PurchaseOrderBodyService } from './document/purchaseOrder.body.serv';
import { PurchaseOrderFooterService } from './document/purchaseOrder.footer.serv';

export class PurchaseOrderService extends DocumentService implements IDocumentService<IPurchaseOrder> {

    servDocumentHeader: PurchaseOrderHeaderService;
    servDocumentBody: PurchaseOrderBodyService;
    servDocumentFooter: PurchaseOrderFooterService;

    public constructor(pdfRepository: string) {
        super();
        this.document = new PDFDocument;
        this.servDocumentHeader = new PurchaseOrderHeaderService(this.document);
        this.servDocumentHeader.margeX = this.margeX;
        this.servDocumentHeader.width = this.width;
        this.servDocumentHeader.defaultFont = this.defaultFont;
        this.servDocumentHeader.defaultFontBold = this.defaultFontBold;

        this.servDocumentBody = new PurchaseOrderBodyService(this.document);
        this.servDocumentBody.margeX = this.margeX;
        this.servDocumentBody.width = this.width;
        this.servDocumentBody.defaultFont = this.defaultFont;
        this.servDocumentBody.defaultFontBold = this.defaultFontBold;

        this.servDocumentFooter = new PurchaseOrderFooterService(this.document);
        this.servDocumentFooter.margeX = this.margeX;
        this.servDocumentFooter.width = this.width;
        this.servDocumentFooter.defaultFont = this.defaultFont;
        this.servDocumentFooter.defaultFontBold = this.defaultFontBold;

        this.pdfRepository = pdfRepository;
    }

    public async create(po: IPurchaseOrder, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back: { id: string, hasError: boolean, filename: string } = { id: "", hasError: false, filename: "" };

        let seller: IEntity = <IEntity>await Entity.findOne({ _id: sellerId });
        if (seller != null && seller != undefined) {
            po.statusHistory = new Array<IStatus>();
            po.statusHistory.push(<IStatus>{ status: "CREATE" });
            po.seller = seller;
            po.number = this.getNumDocument("BC");

            let saved = await PurchaseOrder.create(po);
            let result = await PurchaseOrder.updateOne({ _id: saved._id }, { fileName: saved._id + ".pdf" });
            saved.fileName = saved._id + ".pdf";

            back = await this.createPDF(saved, { annotation: false, annotationText: "DUPLICATA" });
            back.id = saved._id;
        }
        else {
            back.hasError = true;
        }
        return back;
    }

    update(document: IPurchaseOrder, sellerId: string): Promise<{ id: string; hasError: boolean; filename: string; }> {
        throw new Error("Method not implemented.");
    }

    public async duplicatePdf(poid: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        let back: { id: string, hasError: boolean, filename: string } = { id: "", hasError: false, filename: "" };
        let current: IPurchaseOrder = <IPurchaseOrder>await PurchaseOrder.findOne({ _id: poid });
        if (current != null) {
            current.fileName = current.fileName.replace(".pdf", "").replace(".PDF", "") + "-" + moment().unix() + ".pdf";
            back = await this.createPDF(current, { annotation: true, annotationText: "DUPLICATA" });
        }
        else back.hasError = true;
        back.id = poid;
        return back;
    }

    private async createPDF(po: IPurchaseOrder, params: { annotation: boolean, annotationText: string }): Promise<{ id: string, hasError: boolean, filename: string }> {
        
        let hasError = false;
        let path = this.pdfRepository + po.fileName;
        this.document.pipe(fs.createWriteStream(path));
        
        try {
            if (params.annotation) {
                this.document.text(params.annotationText, 10, 10);
            }
            this.generateHeader(po);

            this.document.rect(45, 200, 515, 30).lineWidth(0).stroke();
            this.servDocumentBody.generateTitle(po);
            this.servDocumentBody.generate(po);

            this.servDocumentFooter.generate(po);

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

        return { id: po._id, hasError: hasError, filename: po.fileName };
    }

    private async generateHeader(po: IPurchaseOrder): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(po);
        this.servDocumentHeader.generateQuoteAddressPart(po);
        this.servDocumentHeader.generateCustomerAddressPart(po);
        this.servDocumentHeader.generateReference(po);
    }
}