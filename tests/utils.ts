import moment = require("moment");
import { IQuote } from '../src/models/quote/quote';
import { IInvoice } from '../src/models/invoice/invoice';
import { IItemInvoice } from '../src/models/invoice/itemInvoice';

export const QuoteExample: IQuote = <IQuote>{
    entity: "ENTTEST",
    providerName: "Green light.",
    invoiceLabel: "Adresse devis",
    customerLabel: "Adresse client",

    providerId1: "SIREN : 34345646",
    providerId2: "Agrement 123",
    providerId3: "pr3",

    providerZipCode : "69300",
    providerAddress1 : "1 Chemin des aubepines",
    providerAddress2 : "-",
    providerAddress3 : "-",
    providerCity : "Ecully",
    providerCountry : "FRANCE",
    providerEmail : "test@bob.com",
    providerPhone : "0385421423",

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
    entity: "ENTTEST",
    providerName: "Green light.",
    invoiceLabel: "Adresse facturation",
    customerLabel: "Adresse client",

    providerId1: "SIREN : 34345646",
    providerId2: "Agrement 123",
    providerId3: "pr3",

    providerZipCode: "69300",
    providerAddress1: "1 Chemin des aubepines",
    providerAddress2: "-",
    providerAddress3: "-",
    providerCity: "Ecully",
    providerCountry: "FRANCE",
    providerEmail: "test@bob.com",
    providerPhone: "0385421423",

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