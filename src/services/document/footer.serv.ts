export abstract class DocumentFooterService {

    document: any;
    public margeX: number = 0;
    public width: number = 0;
    public defaultFont: string = "";
    public defaultFontBold: string = "";
    public interval: number = 11;

    public constructor(document: any) {
        this.document = document;
    }

    public async generateFooter(additionals: string[]): Promise<void> {
        let x: number = this.margeX + 140;
        let y: number = 450;
               
        if (additionals != null) {
            for (var i = 0; i < additionals.length; i++) {
                this.document.text(additionals[i], x, y);
                y = y + this.interval;
            }
        }
    }

}