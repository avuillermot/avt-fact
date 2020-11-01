import { expect } from 'chai';
import "mocha";
import { InvoiceService } from "./../src/controllers/invoice.document.serv";
import { IInvoice } from "./../src/models/invoice.document";
import moment from "moment";
import DbSettings from "./config";

describe('Simple test must generate PDF', () => {

    let db: DbSettings = new DbSettings();
    db.connection();

    it('Should create a invoice', async () => {
        let query: InvoiceService = new InvoiceService();
        let invoice: IInvoice = <IInvoice>{
            providerName: "AVU Corp."
        }
        invoice.providerZipCode = "69380";
        invoice.providerAddress1 = "8 allée des noisetiers";
        invoice.providerAddress2 = "bib";
        invoice.providerAddress3 = "adresse 3"
        invoice.providerCity = "Lissieu";
        invoice.providerCountry = "FRANCE";
        invoice.providerEmail = "test@bob.com";
        invoice.providerPhone = "0385421423";

        invoice.customerName = "Kuehne+Nagel";

        invoice.invoiceZipCode = "21160";
        invoice.invoiceAddress1 = "7 impasse Henri Lapostolet";
        invoice.invoiceAddress2 = "adresse 2";
        invoice.invoiceAddress3 = "adresse 3";
        invoice.invoiceCity = "Perrigny-les-Dijon";
        invoice.invoiceCountry = "FRANCE";

        invoice.customerZipCode = "21160";
        invoice.customerAddress1 = "7 impasse Henri Lapostolet";
        invoice.customerAddress2 = "adresse 2";
        invoice.customerAddress3 = "adresse 3";
        invoice.customerCity = "Perrigny-les-Dijon";
        invoice.customerCountry = "FRANCE";

        invoice.invoiceNumber = "Facture numero : INV01";
        invoice.invoiceDate = "Emis le  : " + moment().utc().format("L");
        invoice.deliveryDate = "Date de la vente : " + moment().utc().format("L");

        /*invoice.items.push({ description: "elagage laurier xxxxxxxxxxxxxxxxxxxxxxxxxxxxx", price: 25.2, comment: "évacuation dechets" });
        invoice.items.push({ description: "elagage herablexxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", price: 125.2, comment: "évacuation dechets non" });*/

        //query.pdfRepository = settings.pdfRepository;
        const document = await query.createAndSave(invoice);
        //const document = await query.createSigned(invoice, false);
        //expect(fs.existsSync(settings.pdfRepository + document.filename), "PDF file won't exists").equal(true);
        //fs.unlink(settings.pdfRepository + document.filename, function () { });
        console.log(document);
    });
});