import { DocumentFooterService } from "./footer.serv"
import { IPurchaseOrder } from "../../models/document/purchaseOrder";

export class PurchaseOrderFooterService extends DocumentFooterService {

    public constructor(document: any) {
        super(document);
    }

    public async generate(po: IPurchaseOrder): Promise<void> {
        return super.generateFooter([]);
    }
}