import { DocumentHeaderService } from "./document.header.serv";
import { IInvoice } from "../models/invoice/invoice";
import moment = require("moment");

export class InvoiceHeaderService extends DocumentHeaderService {

    public constructor(document:any) {
        super(document);
    }

    public async generateHeaderProviderPart(invoice: IInvoice): Promise<void> {
        await super.setProviderPart(invoice);
    }

    public async generateInvoiceAddressPart(invoice: IInvoice): Promise<void> {
        await super.setAddressPart(invoice);
    }

    public async generateCustomerAddressPart(invoice: IInvoice): Promise<void> {
        await super.setCustomerAddressPart(invoice);
    }

    public async generateHeaderInvoiceReference(invoice: IInvoice): Promise<void> {
        let back: { x: number, y: number, interval: number } = await super.setInvoiceReferencePart(invoice);
        this.document.text("bbbb", 50, 50);
        console.log(back);
        console.log("set deliveryDate");
        if (invoice.deliveryDate != null) {
            console.log(invoice.deliveryDate);
            await super.setText(moment(invoice.deliveryDate).format("L"), back.x, back.y);
            back.y = back.y + back.interval;
        }

        console.log("set due");
        if (invoice.dueDate != null) {
            console.log(invoice.dueDate);
            await super.setText(moment(invoice.deliveryDate).format("L"), back.x, back.y);
            back.y = back.y + back.interval;
        }
    }
}