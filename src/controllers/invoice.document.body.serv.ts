import { DocumentBodyService } from "./document.body.serv"
import { IInvoice } from '../models/invoice/invoice';

export class InvoiceBodyService extends DocumentBodyService {

    public constructor(document: any) {
        super(document);
    }

    public async generateTitle(invoice: IInvoice): Promise<void> {
        await super.setTitle("FACTURE");
    }

    public async generateDetails(invoice: IInvoice): Promise<void> {
        await this.setDetails({ taxAmount: invoice.taxAmount.toString(), total: invoice.total.toString() }, invoice.items);
    }
}