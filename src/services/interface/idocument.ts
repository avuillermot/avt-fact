import AsyncLock = require('async-lock');

export interface IDocumentService<T> {
    get(params: T): Promise<T[]>;
    getAll(entity: string): Promise<T[]>;
    create(document: T, sellerId: string): Promise<T>;
    update(document: T, sellerId: string): Promise<T>;
    lock(document: T, sellerId: string): Promise<T>;
}

export class DocumentBaseService<T> {

    private static lock: AsyncLock = new AsyncLock();
    private static num: number = 0;

    public getNumDocument(prefix: string): string {
        DocumentBaseService.lock.acquire('key', function () { DocumentBaseService.num++ });
        return prefix + DocumentBaseService.num.toString();
    }
}