import PDFDocument = require('pdfkit');
import moment = require("moment");
import Entity, { IEntity } from "./../models/entity/entity";
import Quote, { IQuote } from '../models/document/quote';
import { IStatus } from "../models/document/status";
import { IDocumentService, DocumentBaseService } from '../services/interface/idocument';

export class QuoteService extends DocumentBaseService<IQuote> implements IDocumentService<IQuote> {

    public async get(params: IQuote): Promise<IQuote[]> {
        let result: IQuote[] = await Quote.find(params);
        return result;
    }

    public async getAll(entity: string): Promise<IQuote[]> {
        let quotes: IQuote[];
        quotes = await Quote.find({ entityId: entity });
        return quotes;
    }

    // Create a PDF file from a quote
    public async create(quote: IQuote, sellerId: string): Promise<IQuote> {
        delete quote._id;
        delete quote.id;

        let saved: IQuote = <IQuote>{};
        let seller: IEntity = <IEntity>await Entity.findOne({ _id: sellerId });

        if (seller != null && seller != undefined) {
            quote.status = "CREATE";
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
                saved = await Quote.create(quote);
            }
            catch (ex) {
                console.log(ex);
            }
        }
        return saved;
    }

    private async change(quote: IQuote, sellerId: string, status: string): Promise<IQuote> {
        let saved: IQuote = <IQuote>{};
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
                saved = await Quote.updateOne({ _id: quote._id }, quote);
            }
            catch (ex) {
                console.log(ex);
            }
        }
        return saved;
    }

    // update & a PDF file from a quote
    public async update(quote: IQuote, sellerId: string): Promise<IQuote> {
        const read: IQuote | null = await Quote.findById(quote._id);
        if (read != null) {
            if (read.status == 'LOCK') throw new Error("Un devis edité ne peut pas être mis à jour");
        }
        return await this.change(quote, sellerId, 'UPDATE');
    }

    public async lock(quote: IQuote, sellerId: string): Promise<IQuote> {
        const read: IQuote | null = await Quote.findById(quote._id);
        if (read != null) {
            if (read.status == 'LOCK') throw new Error("Devis déjà édité");
        }
        return await this.change(quote, sellerId, 'LOCK');
    }
}