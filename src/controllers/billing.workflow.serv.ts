import moment = require("moment");
import Quote, { IQuote } from "./../models/quote/quote";
import { ISalesReceipt } from "./../models/document/salesReceipt";
import { SalesReceiptService } from './salesReceipt.document.serv';
import { ApplicationSetting } from "./../config";

export class BillingWorkflowService {

    public async createSalesReceiptFromQuote(id: string, deliveryDate:Date) {
        let servSR: SalesReceiptService = new SalesReceiptService(ApplicationSetting.pdfRepository);

        let quote:IQuote = <IQuote>await Quote.findOne({ _id: id });

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

            number: "new billing num",
            date: moment().utc().toDate(),
            deliveryDate: deliveryDate,

            items: quote.items,

            quoteId: quote.id
        };
        return await servSR.createAndSave(sales, sales.seller.id);
    }
    
}