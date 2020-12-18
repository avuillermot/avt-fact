import { connect, connection } from 'mongoose';

export class ApplicationDbSettings {
    protected dbUrl: string = "mongodb://localhost:27017/avtFact";
    protected debug: boolean = true;
    protected static isInit: boolean = false;

    public connection(): void {
        if (ApplicationDbSettings.isInit == false) {
            connection.on('error', err => {
                console.log(err);
            });
            connect(this.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).catch(error => console.log(error));
            if (this.debug) {
                console.log("open connection :");
                console.log(connection.host);
                console.log(connection.port);
            }
            ApplicationDbSettings.isInit = true;
        }
    }

    public dropCollection(collection: string): void {
        try {
            connection.dropCollection(collection);
        }
        catch (ex) {
            console.log("Collection " + collection + " not exists, dropCollection impossible.");
        }
    }
}

export class ApplicationDbTestSettings extends ApplicationDbSettings {
    constructor() {
        super();
        this.dbUrl = "mongodb://localhost:27017/unitAvtFact";
    }
}

export class ApplicationSetting {
    public static pdfRepository: string = "pdf/"
    public static jtokenSecretKey: string = "PERRIGNY21160";
    public static previewPdfAllowDomain: string = "http://localhost:8000";
    public static CssDocument: string = "http://localhost:8000/pdf/document-pdf";
    public static HtmlDocumentTemplateDirectory: string = "c:/projets_test/avt-fact/src/html-template/";
}

