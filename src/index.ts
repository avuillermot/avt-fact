import express from 'express';
import { ApplicationDbTestSettings as DbSettings, ApplicationSetting } from "./../src/config";
import { CustomerService } from './controllers/customer.serv'
// rest of the code remains same
const app = express();
const PORT = 8000;
let db: DbSettings = new DbSettings();
db.connection();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', async(req, res) => {
    let serv: CustomerService = new CustomerService();
    res.send(await serv.get("ENTTEST"));
});
app.listen(PORT, () => {
    console.log('[server]: Server is running at https://localhost:${PORT}');
});