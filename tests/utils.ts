import moment = require("moment");
import { IQuote } from '../src/models/quote/quote';
import { IInvoice } from '../src/models/invoice/invoice';
import { IItemInvoice } from '../src/models/invoice/itemInvoice';
import { IEntity } from '../src/models/entity/entity';

export const QuoteExample: IQuote = <IQuote>{
    entityId: "ENTTEST",
    invoiceLabel: "Adresse devis",
    customerLabel: "Adresse client",
    seller: <IEntity>{
        name: "Green light.",
        id1: "SIREN : 34345646",
        id2: "Agrement 123",
        id3: "pr3",
        zipCode: "69300",
        address1: "1 Chemin des aubepines",
        address2: "-",
        address3: "-",
        city: "Ecully",
        country: "FRANCE",
        email: "test@bob.com",
        phone: "0385421423",
    },
    customerId : "TIERS0001",
    customerName : "John Doe",
    invoiceZipCode : "21160",
    invoiceAddress1 : "7 impasse de la mer",
    invoiceAddress2 : "-",
    invoiceAddress3 : "-",
    invoiceCity : "Dijon",
    invoiceCountry : "FRANCE",

    customerZipCode : "69380",
    customerAddress1 : "1 rue de l'océan",
    customerAddress2 : "-",
    customerAddress3 : "-",
    customerCity : "Lissieu",
    customerCountry : "FRANCE",

    invoiceNumber : "4274175",
    invoiceDate : moment().utc().toDate(),

    items : [
        <IItemInvoice>{ productName: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8 },
        <IItemInvoice>{ productName: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8 },
        <IItemInvoice>{ productName: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8 },
        <IItemInvoice>{ productName: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8 },
        <IItemInvoice>{ productName: "Vidange", price: 45, quantity: 1, taxPercent: 8 },
        <IItemInvoice>{ productName: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8 }
    ]
}

export const InvoiceExample: IInvoice = <IInvoice>{
    entityId: "ENTTEST",
    invoiceLabel: "Adresse facturation",
    customerLabel: "Adresse client",
    seller: <IEntity>{
        id: "",
        id1: "SIREN : 34345646",
        id2: "Agrement 123",
        id3: "pr3",
        name: "Green Light",
        zipCode: "69300",
        address1: "1 Chemin des aubepines",
        address2: "-",
        address3: "-",
        city: "Ecully",
        country: "FRANCE",
        email: "test@bob.com",
        phone: "0385421423"
    },
    customerId: "TIERS0002",
    customerName: "John Doe",
    invoiceZipCode: "21160",
    invoiceAddress1: "7 impasse de la mer",
    invoiceAddress2: "-",
    invoiceAddress3: "-",
    invoiceCity: "Dijon",
    invoiceCountry: "FRANCE",

    customerZipCode: "69380",
    customerAddress1: "1 rue de l'océan",
    customerAddress2: "-",
    customerAddress3: "-",
    customerCity: "Lissieu",
    customerCountry: "FRANCE",

    invoiceNumber: "4274175",
    invoiceDate: moment().utc().toDate(),
    deliveryDate: moment().utc().toDate(),

    items: [
        <IItemInvoice>{ productName: "Kit EMBD 3P", price: 170.1, quantity: 1, taxPercent: 8 },
        <IItemInvoice>{ productName: "Cylindre", price: 91.4, quantity: 1, taxPercent: 8 },
        <IItemInvoice>{ productName: "Tarif horaire", price: 78, quantity: 4, taxPercent: 8 },
        <IItemInvoice>{ productName: "Huile BP", price: 5.09, quantity: 4, taxPercent: 8 },
        <IItemInvoice>{ productName: "Vidange", price: 45, quantity: 1, taxPercent: 8 },
        <IItemInvoice>{ productName: "Contribution dechet", price: 1.42, quantity: 1, taxPercent: 8 }
    ]
}