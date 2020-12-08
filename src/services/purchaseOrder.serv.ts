import PurchaseOrder, { IPurchaseOrder } from "./../models/document/purchaseOrder"

export class PurchaseOrderService {
    public async getAll(entity:string): Promise<IPurchaseOrder[]> {
        let quotes: IPurchaseOrder[];
        quotes = await PurchaseOrder.find({ entityId: entity });
        return quotes;
    }
}