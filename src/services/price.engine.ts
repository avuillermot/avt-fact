import { IItemLine } from './../models/document/itemLine';
import moment = require("moment");

export class PriceEngine {

    public static calculate(current: { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] }): { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] } {
        let data: { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] } =
        {
            total: 0, taxAmount: 0, totalFreeTax: 0, items: new Array<IItemLine>()
        };

        try {
            let origine: { total: number, taxAmount: number, totalFreeTax: number; items: IItemLine[] } = current;

            for (let i = 0; i < origine.items.length; i++) {
                let current = origine.items[i];
                current.taxAmount = (current.price * (current.taxPercent / 100)) * current.quantity;
                current.totalFreeTax = current.price * current.quantity;
                current.total = current.taxAmount + current.totalFreeTax;

                /*current.updated = moment().utc().toDate();
                if (current.created)*/

                data.taxAmount = data.taxAmount + current.taxAmount;
                data.totalFreeTax = data.totalFreeTax + current.totalFreeTax;
                data.total = data.total + current.total;
            }
            data.items = origine.items;
        }
        catch (ex) {
            console.log("eerror");
        }
        return data;
    }

}