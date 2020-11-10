import moment = require("moment");
import Quote, { IQuote } from "./../models/quote/quote";
import { IInvoice } from "./../models/invoice/invoice";
import { InvoiceService } from './invoice.document.serv';
import { ApplicationSetting } from "./../config";

export class BillingWorkflowService {

    public async createInvoiceFromQuote(id: string, deliveryDate:Date) {
        let servInvoice: InvoiceService = new InvoiceService(ApplicationSetting.pdfRepository);

        let quote:IQuote = <IQuote>await Quote.findOne({ _id: id });

        let invoice: IInvoice = <IInvoice>{
            entityId: quote.entityId,

            customer: quote.customer,
            seller: quote.seller,

            invoiceZipCode: quote.invoiceZipCode,
            invoiceAddress1: quote.invoiceZipCode,
            invoiceAddress2: quote.invoiceAddress2,
            invoiceAddress3: quote.invoiceAddress3,
            invoiceCity: quote.invoiceCity,
            invoiceCountry: quote.invoiceCountry,

            invoiceNumber: "new invoice num",
            invoiceDate: moment().utc().toDate(),
            deliveryDate: deliveryDate,

            items: quote.items,

            quoteId: quote.id
        };
        return await servInvoice.createAndSave(invoice, invoice.seller.id);
    }
    
}