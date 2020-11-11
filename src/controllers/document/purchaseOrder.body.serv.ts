import { DocumentBodyService } from "./body.serv"
import { IPurchaseOrder } from "../../models/document/purchaseOrder";

export class PurchaseOrderBodyService extends DocumentBodyService {

    public constructor(document: any) {
        super(document);
    }

    public async generateTitle(po: IPurchaseOrder): Promise<void> {
        await super.setTitle("BON DE COMMANDE");
    }

    public async generate(quote: IPurchaseOrder): Promise<void> {
        await this.setDetails({ taxAmount: quote.taxAmount.toString(), total: quote.total.toString() }, quote.items);
    }
}