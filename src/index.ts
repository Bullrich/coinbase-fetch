import cors from "cors";
import "dotenv/config";
import express from "express";
import { CoinbaseApi } from "./coinbase/api";


const app = express();

app.use(cors());

app.use("/", express.static("./client/public"));

const api = new CoinbaseApi();

app.get("/accounts", async (req, res) => {
    api.getAccounts().then(r => {
        console.log("result", r);
        res.send(r);
        // res.send({id:r.id, name:r.name});
    }).catch((e) => {
        console.error("ERROR", e);
        res.send(e)
    });
});

app.get("/transactions/:account", async(req,res)=>{
    api.getTransactions(req.params.account).then(r => {
        console.log("result", r);
        res.send(r);
    }).catch((e) => {
        console.error("ERROR", e);
        res.send(e);
    });
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
