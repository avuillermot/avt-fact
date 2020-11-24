import { DocumentFooterService } from "./footer.serv"
import { ISalesReceipt } from "../../models/document/salesReceipt";

export class SalesReceiptFooterService extends DocumentFooterService {

    public constructor(document: any) {
        super(document);
    }

    public async generate(sales: ISalesReceipt): Promise<void> {
        return super.generateFooter([]);
    }
}