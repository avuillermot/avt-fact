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

export class PurchaseOrderDocumentService extends DocumentService implements IDocumentService<IPurchaseOrder> {

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

    public async get(params: IPurchaseOrder): Promise<IPurchaseOrder[]> {
        let result: IPurchaseOrder[] = await PurchaseOrder.find(params);
        return result;
    }

    public async getAll(entity: string): Promise<IPurchaseOrder[]> {
        let pos: IPurchaseOrder[];
        pos = await PurchaseOrder.find({ entityId: entity });
        return pos;
    }

    private async createFilePDF(po: IPurchaseOrder, params: { annotation: boolean, annotationText: string }): Promise<{ id: string, hasError: boolean, filename: string, message: string }> {

        let path = this.pdfRepository + po.fileName;
        let exist: boolean = await fs.existsSync(path);
        if (exist) await fs.unlinkSync(path);
        this.document.pipe(fs.createWriteStream(path));

        const back = { id: po._id, hasError: false, filename: po.fileName, message: "" }
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

    public async create(po: IPurchaseOrder, sellerId: string): Promise<{ id: string, hasError: boolean, filename: string, message: string }> {
        delete po._id;
        delete po.id;

        let back: { id: string, hasError: boolean, filename: string, message: string } = { id: "", hasError: false, filename: "", message: "" };

        let seller: IEntity = <IEntity>await Entity.findOne({ _id: sellerId });

        if (seller != null && seller != undefined) {
            po.status = "CREATE";
            po.statusHistory = new Array<IStatus>();
            po.statusHistory.push(<IStatus>{ status: "CREATE", created: moment().utc().toDate(), updated: moment().utc().toDate(), createdBy: po.createdBy, updatedBy: po.createdBy });
            po.seller = seller;
            po.number = this.getNumDocument("BC");

            if (po.address1 == null || po.address1 == "") po.address1 = po.seller.address1;
            if (po.address2 == null || po.address2 == "") po.address2 = po.seller.address2;
            if (po.address3 == null || po.address3 == "") po.address3 = po.seller.address3;
            if (po.zipCode == null || po.zipCode == "") po.zipCode = po.seller.zipCode;
            if (po.city == null || po.city == "") po.city = po.seller.city;
            if (po.country == null || po.country == "") po.country = po.seller.country;
            if (po.entityId == null || po.entityId == "") po.entityId = sellerId;

            try {
                let saved = await PurchaseOrder.create(po);
                let result = await PurchaseOrder.updateOne({ _id: saved._id }, { fileName: saved._id + ".pdf" });
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

    update(document: IPurchaseOrder, sellerId: string): Promise<{ id: string; hasError: boolean; filename: string; }> {
        throw new Error("Method not implemented.");
    }

    public async duplicatePdf(poid: string): Promise<{ id: string, hasError: boolean, filename: string }> {
        throw new Error("Method not implemented.");
    }

    lock(document: IPurchaseOrder, sellerId: string): Promise<{ id: string; hasError: boolean; filename: string; message: string; }> {
        throw new Error("Method not implemented.");
    }

    private async generateHeader(po: IPurchaseOrder): Promise<void> {
        this.servDocumentHeader.generateHeaderProviderPart(po);
        this.servDocumentHeader.generateAddressPart(po);
        this.servDocumentHeader.generateCustomerAddressPart(po);
        this.servDocumentHeader.generateReference(po);
    }
}