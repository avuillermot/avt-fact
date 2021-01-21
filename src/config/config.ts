import { connect, connection } from 'mongoose';
import Parameter from '../models/parameter';

export class ApplicationDbSettings {
    protected dbUrl: string = process.env.APP_MONGOHOST;
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
                console.log(connection.name);
            }
            ApplicationDbSettings.isInit = true;
        }
    }

    public dropDb() {
        connection.dropDatabase();
    }
}

export class ApplicationSetting {
    public static pdfRepository: string = "pdf/"
    public static jtokenSecretKey: string = "PERRIGNY21160";
    public static previewPdfAllowDomain: string = "http://localhost:8000";
    public static cssDocument: string = "http://localhost:8000/pdf/document-pdf";
    public static htmlDocumentTemplateDirectory: string = "c:/projets_test/avt-fact/src/html-template/";
    public static urlUserService: string = process.env.APP_URL_USER_SERVICE;
}

