import moment = require("moment");
import Quote, { IQuote } from "./../models/document/quote";
import PurchaseOrder, { IPurchaseOrder } from "./../models/document/purchaseOrder";
import { ISalesReceipt } from "./../models/document/salesReceipt";
import { SalesReceiptService } from './salesReceipt.document.serv';
import { ApplicationSetting } from "./../config";
import { IStatus } from "../models/document/status";

export class BillingWorkflowService {

    public async createSalesReceiptFromQuote(id: string) {
        let servSR: SalesReceiptService = new SalesReceiptService(ApplicationSetting.pdfRepository);

        let quote: IQuote = <IQuote>await Quote.findOne({ _id: id });
        quote.statusHistory.push(<IStatus>{ status: "CLOSE" })
        await Quote.updateOne({ _id: quote.id }, quote);

        let sales: ISalesReceipt = <ISalesReceipt>{
            entityId: quote.entityId,

            customer: quote.customer,
            seller: quote.seller,

            zipCode: quote.zipCode,
            address1: quote.address1,
            address2: quote.address2,
            address3: quote.address3,
            city: quote.city,
            country: quote.country,

            number: "",
            date: moment().utc().toDate(),
            items: quote.items,

            quoteId: quote.id
        };
        return await servSR.createAndSave(sales, sales.seller.id);
    }

    public async createSalesReceiptFromPurchaseOrder(id: string) {
        let servSR: SalesReceiptService = new SalesReceiptService(ApplicationSetting.pdfRepository);

        let po: IPurchaseOrder = <IPurchaseOrder>await PurchaseOrder.findOne({ _id: id });
        po.statusHistory.push(<IStatus>{ status: "CLOSE" })
        await PurchaseOrder.updateOne({ _id: po.id }, po);

        let sales: ISalesReceipt = <ISalesReceipt>{
            entityId: po.entityId,

            customer: po.customer,
            seller: po.seller,

            zipCode: po.zipCode,
            address1: po.address1,
            address2: po.address2,
            address3: po.address3,
            city: po.city,
            country: po.country,
            
            number: "",
            date: moment().utc().toDate(),
            items: po.items,

            quoteId: po.quoteId,
            purchaseOrderId: po.id
        };
        return await servSR.createAndSave(sales, sales.seller.id);
    }
    
}