import { DocumentHeaderService } from "./header.serv";
import { ISalesReceipt } from "../../models/document/salesReceipt";
import moment = require("moment");

export class SalesReceiptHeaderService extends DocumentHeaderService {

    public constructor(document:any) {
        super(document);
    }

    public async generateHeaderProviderPart(sales: ISalesReceipt): Promise<void> {
        await super.setProviderPart(sales.seller);
    }

    public async generateSalesReceiptAddressPart(sales: ISalesReceipt): Promise<void> {
        await super.setAddressPart(sales.customer);
    }

    public async generateCustomerAddressPart(sales: ISalesReceipt): Promise<void> {
        await super.setCustomerAddressPart(sales.customer);
    }

    public async generateReference(sales: ISalesReceipt): Promise<void> {
        let additionals: string[] = new Array<string>();
        additionals.push("Livraison : " + moment(sales.deliveryDate).locale("fr").format("L"));
        additionals.push("Paiement : " + moment(sales.paymentDate).locale("fr").format("L"));

        await super.setReferencePart(sales, additionals);
    }
}