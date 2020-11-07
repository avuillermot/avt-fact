import { DocumentFooterService } from "./document.footer.serv"
import { IInvoice } from "../models/invoice/invoice";

export class InvoiceFooterService extends DocumentFooterService {

    public constructor(document: any) {
        super(document);
    }

    public async generateFooter(invoice: IInvoice) {

    }
}