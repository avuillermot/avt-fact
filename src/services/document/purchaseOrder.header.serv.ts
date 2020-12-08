import { DocumentHeaderService } from "./header.serv";
import { IPurchaseOrder } from "../../models/document/purchaseOrder";
import moment = require("moment");

export class PurchaseOrderHeaderService extends DocumentHeaderService {

    public constructor(document:any) {
        super(document);
    }

    public async generateHeaderProviderPart(po: IPurchaseOrder): Promise<void> {
        await super.setProviderPart(po.seller);
    }

    public async generateAddressPart(po: IPurchaseOrder): Promise<void> {
        await super.setAddressPart(po.customer);
    }

    public async generateCustomerAddressPart(po: IPurchaseOrder): Promise<void> {
        await super.setCustomerAddressPart(po.customer);
    }

    public async generateReference(po: IPurchaseOrder): Promise<void> {
        let additionals: string[] = new Array<string>();
        additionals.push("Livraison : " + moment(po.deliveryDate).locale("fr").format("L"));
        await super.setReferencePart(po, additionals);
    }
}