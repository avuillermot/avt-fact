import moment = require("moment");
import Entity, { IEntity } from "./../models/entity/entity";
import Quote, { IQuote } from '../models/document/quote';
import { IStatus } from "../models/document/status";
import { IDocumentService, DocumentBaseService } from '../services/interface/idocument';

export class QuoteService extends DocumentBaseService<IQuote> implements IDocumentService<IQuote> {

    private checkStatusTransition(sourceStatus: string, targetStatus: string) : boolean {
        if (sourceStatus == "INIT" && targetStatus == "CREATE") return true;
        if (sourceStatus == "CREATE" && targetStatus == "UPDATE") return true;
        if (sourceStatus == "CREATE" && targetStatus == "CANCEL") return true;
        if (sourceStatus == "UPDATE" && targetStatus == "UPDATE") return true;
        if (sourceStatus == "CREATE" && targetStatus == "LOCK") return true;
        if (sourceStatus == "UPDATE" && targetStatus == "LOCK") return true;
        if (sourceStatus == "LOCK" && targetStatus == "ACCEPT") return true;
        if (sourceStatus == "LOCK" && targetStatus == "REJECT") return true;
        return false;
    }

    public async get(params: IQuote): Promise<IQuote[]> {
        let err: any = {};
        let result: IQuote[] = await Quote.find(err, params);
        return result;
    }

    public async getAll(entity: string): Promise<IQuote[]> {
        let quotes: IQuote[];
        quotes = await Quote.find({ entityId: entity });
        return quotes;
    }

    // Create a PDF file from a quote
    public async create(quote: IQuote, sellerId: string): Promise<IQuote> {
        //delete quote._id;
        delete quote.id;

        let saved: IQuote = <IQuote>{};
        let seller: IEntity = <IEntity>await Entity.findOne({ _id: sellerId });

        if (seller != null && seller != undefined) {
            quote.status = "CREATE";
            quote.statusHistory = new Array<IStatus>();
            quote.statusHistory.push(<IStatus>{ status: "CREATE", created: moment().utc().toDate(), updated: moment().utc().toDate(), createdBy: quote.createdBy, updatedBy: quote.createdBy });
            quote.seller = seller;
            quote.number = await this.getNumDocument("DE", "QUOTE");

            if (quote.address1 == null || quote.address1 == "") quote.address1 = quote.customer.address1;
            if (quote.address2 == null || quote.address2 == "") quote.address2 = quote.customer.address2;
            if (quote.address3 == null || quote.address3 == "") quote.address3 = quote.customer.address3;
            if (quote.zipCode == null || quote.zipCode == "") quote.zipCode = quote.customer.zipCode;
            if (quote.city == null || quote.city == "") quote.city = quote.customer.city;
            if (quote.country == null || quote.country == "") quote.country = quote.customer.country;
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

        if (this.checkStatusTransition(quote.status, status) == false) throw new Error('Ce changement de statut n\'est pas autorisé.')

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

    public async cancel(id: string, sellerId: string, userid:string): Promise<IQuote> {
        let quotes: IQuote[] = await Quote.find({ _id: id, entityId: sellerId });
        if (quotes.length != 1) throw new Error("Devis introuvable !");
        quotes[0].updatedBy = userid;
        if (quotes[0].status == 'CANCEL') throw new Error("Devis déjà annulé");

        return await this.change(quotes[0], sellerId, 'CANCEL');
    }

    public async accept(id: string, sellerId: string, userid: string): Promise<IQuote> {
        let quotes: IQuote[] = await Quote.find({ _id: id, entityId: sellerId });
        if (quotes.length != 1) throw new Error("Devis introuvable !");
        quotes[0].updatedBy = userid;
        if (quotes[0].status == 'ACCEPT') throw new Error("Devis déjà accepté");

        return await this.change(quotes[0], sellerId, 'ACCEPT');
    }

    public async reject(id: string, sellerId: string, userid: string): Promise<IQuote> {
        let quotes: IQuote[] = await Quote.find({ _id: id, entityId: sellerId });
        if (quotes.length != 1) throw new Error("Devis introuvable !");
        quotes[0].updatedBy = userid;
        if (quotes[0].status == 'REJECT') throw new Error("Devis déjà refusé");

        return await this.change(quotes[0], sellerId, 'REJECT');
    }
}