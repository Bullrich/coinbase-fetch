import cors from "cors";
import "dotenv/config";
import express from "express";
import { CoinbaseApi } from "./coinbase/api";


const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("GET request to the homepage")
});

const api = new CoinbaseApi();

app.get("/accounts", async (req, res) => {
    api.getUser().then(r => {
        console.log("result", r);
        res.send({id:r.id, name:r.name});
    }).catch((e) => {
        console.error("ERROR", e);
        res.send(e)
    });
});

app.get("/transactions", async(req,res)=>{
    api.getTransactions().then(r => {
        console.log("result", r);
        res.send({id:r.id, name:r.name});
    }).catch((e) => {
        console.error("ERROR", e);
        res.send(e);
    });
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
