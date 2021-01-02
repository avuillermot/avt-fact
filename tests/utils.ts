import moment = require("moment");
import { IQuote } from '../src/models/document/quote';
import { ISalesReceipt } from '../src/models/document/salesReceipt';
import { IItemLine } from '../src/models/document/itemLine';
import { IEntity } from '../src/models/entity/entity';
import { ICustomer } from '../src/models/entity/customer';
import { IPurchaseOrder } from "../src/models/document/purchaseOrder";

export const EntityId: string = "5fb6b6911af44c429086f555";

let fnNumberCustomer = function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const QuoteExample: IQuote = <IQuote>{
    entityId: EntityId,
    seller: <IEntity>{
        name: "Green light.",
        siren: "424 430 015 00026",
        siret: "424 430 015 00026 001",
        codeAPE: "4322B",
        codeTVA: "IT1235",
        legalType: "SARL",
        capital: 8000,
        zipCode: "69300",
        address1: "1 Chemin des vendeurs",
        address2: "-",
        address3: "-",
        city: "Ecully",
        country: "FRANCE",
        email: "test@bob.com",
        phone: "0385421423",

    },
    customer: <ICustomer>{
        entityId: EntityId,
        id: "TIERS0001",
        lastName: "Doe",
        firstName: "John",
        zipCode: "69380",
        address1: "1 rue du client",
        address2: "-",
        address3: "-",
        city: "Lissieu",
        country: "FRANCE",
        email: "clustomer@quote.com",
        phone: "03487502770",
        number: fnNumberCustomer(0,10000)
    },
    zipCode : "21160",
    address1 : "7 impasse des devis",
    address2 : "-",
    address3 : "-",
    city : "Dijon",
    country : "FRANCE",

    number : "",
    date : moment().utc().toDate(),
    html: "<div>mon html</div>",
    items : [
        <IItemLine>{ name: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8, entityId:EntityId, order: 1 },
        <IItemLine>{ name: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8, entityId: EntityId, order: 2 },
        <IItemLine>{ name: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8, entityId: EntityId, order: 3 },
        <IItemLine>{ name: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8, entityId: EntityId, order: 4 },
        <IItemLine>{ name: "Vidange", price: 45, quantity: 1, taxPercent: 8, entityId: EntityId, order: 5 },
        <IItemLine>{ name: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8, entityId: EntityId, order: 6 }
    ]
}

export const SalesReceiptExample: ISalesReceipt = <ISalesReceipt>{
    entityId: EntityId,
    seller: <IEntity>{
        name: "Green light.",
        siren: "424 430 015 00026",
        siret: "424 430 015 00026 001",
        codeAPE: "4322B",
        codeTVA: "IT1235",
        legalType: "SARL",
        capital: 8000,
        zipCode: "69300",
        address1: "1 Chemin des vendeurs",
        address2: "-",
        address3: "-",
        city: "Ecully",
        country: "FRANCE",
        email: "test@bob.com",
        phone: "0385421423",
    },
    customer: {
        entityId: EntityId,
        id: "TIERS0001",
        lastName: "Doe",
        firstName: "Jane",
        zipCode: "69380",
        address1: "1 rue du client",
        address2: "-",
        address3: "-",
        city: "Lissieu",
        country: "FRANCE",
        email: "clustomer@salesreceipt.com",
        phone: "03487502560",
        number: fnNumberCustomer(0, 10000)
    },
    zipCode: "21160",
    address1: "7 impasse de la facture",
    address2: "-",
    address3: "-",
    city: "Dijon",
    country: "FRANCE",

    number: "",
    date: moment().utc().toDate(),
    quoteId: "",
    purchaseOrderId: "",
    items: [
        <IItemLine>{ name: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Vidange", price: 45, quantity: 1, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8, entityId: EntityId }
    ]
}

export const PurchaseOrderExample: IPurchaseOrder = <IPurchaseOrder>{
    entityId: EntityId,
    seller: <IEntity>{
        name: "Green light.",
        siren: "424 430 015 00026",
        siret: "424 430 015 00026 001",
        codeAPE: "4322B",
        codeTVA: "IT1235",
        legalType: "SARL",
        capital: 8000,
        zipCode: "69300",
        address1: "1 Chemin des vendeurs",
        address2: "-",
        address3: "-",
        city: "Ecully",
        country: "FRANCE",
        email: "test@bob.com",
        phone: "0385421423",
    },
    customer: {
        entityId: EntityId,
        id: "TIERS0001",
        lastName: "Doe",
        firstName: "Jane",
        zipCode: "69380",
        address1: "1 rue du client",
        address2: "-",
        address3: "-",
        city: "Lissieu",
        country: "FRANCE",
        email: "clustomer@salesreceipt.com",
        phone: "03487502560",
        number: fnNumberCustomer(0, 10000)
    },
    zipCode: "21160",
    address1: "7 impasse de la facture",
    address2: "-",
    address3: "-",
    city: "Dijon",
    country: "FRANCE",

    number: "",
    date: moment().utc().toDate(),
    quoteId: "",
    items: [
        <IItemLine>{ name: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Vidange", price: 45, quantity: 1, taxPercent: 8, entityId: EntityId },
        <IItemLine>{ name: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8, entityId: EntityId }
    ]
}