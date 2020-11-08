import { DocumentHeaderService } from "./header.serv";
import { IInvoice } from "../../models/invoice/invoice";
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

    public async generateReference(invoice: IInvoice): Promise<void> {
        let additionals: string[] = new Array<string>();
        additionals.push("Livraison : " + moment(invoice.deliveryDate).locale("fr").format("L"));
        additionals.push("Paiement : " + moment(invoice.paymentDate).locale("fr").format("L"));

        await super.setReferencePart(invoice, additionals);
    }
}