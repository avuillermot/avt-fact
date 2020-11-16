import moment = require("moment");
import { IQuote } from '../src/models/document/quote';
import { ISalesReceipt } from '../src/models/document/salesReceipt';
import { IItemLine } from '../src/models/document/itemLine';
import { IEntity } from '../src/models/entity/entity';
import { ICustomer } from '../src/models/entity/customer';
import { IPurchaseOrder } from "../src/models/document/purchaseOrder";

export const EntityId: string = "5fb2d568aa307646f0bae2c0";

export const QuoteExample: IQuote = <IQuote>{
    entityId: "ENTTEST",
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
        entityId: "ENTTEST",
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
        phone: "03487502770"
    },
    zipCode : "21160",
    address1 : "7 impasse des devis",
    address2 : "-",
    address3 : "-",
    city : "Dijon",
    country : "FRANCE",

    number : "",
    date : moment().utc().toDate(),

    items : [
        <IItemLine>{ productName: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8, entityId:"ENTTEST" },
        <IItemLine>{ productName: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Vidange", price: 45, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8, entityId: "ENTTEST" }
    ]
}

export const SalesReceiptExample: ISalesReceipt = <ISalesReceipt>{
    entityId: "ENTTEST",
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
        entityId: "ENTTEST",
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
        phone: "03487502560"
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
        <IItemLine>{ productName: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Vidange", price: 45, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8, entityId: "ENTTEST" }
    ]
}

export const PurchaseOrderExample: IPurchaseOrder = <IPurchaseOrder>{
    entityId: "ENTTEST",
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
        entityId: "ENTTEST",
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
        phone: "03487502560"
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
        <IItemLine>{ productName: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Vidange", price: 45, quantity: 1, taxPercent: 8, entityId: "ENTTEST" },
        <IItemLine>{ productName: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8, entityId: "ENTTEST" }
    ]
}