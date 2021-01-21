import moment = require("moment");
import Quote, { IQuote } from "./../models/document/quote";
import { ISalesReceipt } from "./../models/document/salesReceipt";
import { IStatus } from "../models/document/status";
/*
export class BillingWorkflowService {

    public async createSalesReceiptFromQuote(id: string) {
        let servSR: SalesReceiptService = new SalesReceiptService(ApplicationSetting.pdfRepository);

        let quote: IQuote = <IQuote>await Quote.findOne({ _id: id });
        quote.status = "CLOSE";
        quote.statusHistory.push(<IStatus>{ status: "CLOSE", createdBy: "billing_workflow", updatedBy:"billing_workflow" });
        quote.updated = moment().utc().toDate();
        quote.updatedBy = "billing_workflow";

        await Quote.updateOne({ _id: quote._id }, quote);

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

            quoteId: quote._id
        };
        return await servSR.createAndSave(sales, sales.seller._id);
    }

    public async createSalesReceiptFromPurchaseOrder(id: string) {
        let servSR: SalesReceiptService = new SalesReceiptService(ApplicationSetting.pdfRepository);

        let po: IPurchaseOrder = <IPurchaseOrder>await PurchaseOrder.findOne({ _id: id });
        po.statusHistory.push(<IStatus>{ status: "CLOSE", createdBy: "billing_workflow", updatedBy: "billing_workflow" });
        po.status = "CLOSE";
        po.updated = moment().utc().toDate();
        po.updatedBy = "billing_workflow";
        await PurchaseOrder.updateOne({ _id: po._id }, po);

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
            purchaseOrderId: po._id
        };
        return await servSR.createAndSave(sales, sales.seller._id);
    }
    
}*/