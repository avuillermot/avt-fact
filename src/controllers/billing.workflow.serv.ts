import moment = require("moment");
import Quote, { IQuote } from "./../models/quote/quote";
import { IInvoice } from "./../models/invoice/invoice";
import { InvoiceService } from './invoice.printing.serv';
import { ApplicationSetting } from "./../config";

export class BillingWorkflowService {

    public async createInvoiceFromQuote(id: string, deliveryDate:Date) {
        let servInvoice: InvoiceService = new InvoiceService(ApplicationSetting.pdfRepository);

        let quote:IQuote = <IQuote>await Quote.findOne({ _id: id });

        let invoice: IInvoice = <IInvoice>{
            entityId: quote.entityId,
            invoiceLabel: "Adresse facturation",
            customerLabel: "Adresse client",

            seller: quote.seller,

            customerId: quote.customerId,
            customerName: quote.customerName,
            invoiceZipCode: quote.invoiceZipCode,
            invoiceAddress1: quote.invoiceZipCode,
            invoiceAddress2: quote.invoiceAddress2,
            invoiceAddress3: quote.invoiceAddress3,
            invoiceCity: quote.invoiceCity,
            invoiceCountry: quote.invoiceCountry,

            customerZipCode: quote.customerZipCode,
            customerAddress1: quote.customerAddress1,
            customerAddress2: quote.customerAddress2,
            customerAddress3: quote.customerAddress3,
            customerCity: quote.customerCity,
            customerCountry: quote.customerCountry,

            invoiceNumber: "new invoice num",
            invoiceDate: moment().utc().toDate(),
            deliveryDate: deliveryDate,

            items: quote.items,

            quoteId: quote.id
        };
        return await servInvoice.createAndSave(invoice, invoice.seller.id);
    }
    
}