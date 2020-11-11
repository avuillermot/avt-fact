import { DocumentBodyService } from "./body.serv"
import { ISalesReceipt } from '../../models/document/salesReceipt';

export class SalesReceiptBodyService extends DocumentBodyService {

    public constructor(document: any) {
        super(document);
    }

    public async generateTitle(sales: ISalesReceipt): Promise<void> {
        await super.setTitle("FACTURE");
    }

    public async generateDetails(sales: ISalesReceipt): Promise<void> {
        await this.setDetails({ taxAmount: sales.taxAmount.toString(), total: sales.total.toString() }, sales.items);
    }
}