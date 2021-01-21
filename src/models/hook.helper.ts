import moment = require("moment");

export class HookHelper {
    public static onValidate(item: any): any {
        item.set("updated", moment().utc().toDate());
        if (item.get("created") == null) item.set("created", moment().utc());
    }

    public static onUpdateOne(item: any): any {
        item.updated = moment().utc().toDate();
        if (item.created == null) item.created = moment().utc();
    }
}