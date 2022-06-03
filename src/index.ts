import cors from "cors";
import "dotenv/config";
import express from "express";
import { CoinbaseApi } from "./coinbase/api";


const app = express();

app.use(cors());

app.use("/", express.static("./client/public"));

const api = new CoinbaseApi();

app.get("/accounts", async (_, res, next) => {
    api.getAccounts().then(r => {
        res.send(r);
    }).catch((e) => {
        console.error("ERROR", e);
        next(e);
    });
});

app.get("/transactions/:account", async (req, res, next) => {
    api.getTransactions(req.params.account).then(r => {
        res.send(r);
    }).catch((e) => {
        console.error("ERROR", e);
        next(e);
    });
})

app.get("/withdrawals/:account", async (req, res, next) => {
    api.getWithdrawals(req.params.account).then(r => {
        res.send(r);
    }).catch((e) => {
        console.error("ERROR", e);
        next(e);
    });
});

app.get("/collection/:account", async (req, res, next) => {
    api.getAccountTransactions(req.params.account).then(r => {
        res.send(r);
    }).catch((e) => {
        console.error("ERROR", e);
        next(e);
    });
});

app.get("/user", async (_, res, next) => {
    api.getUser().then(r => {
        res.send(r);
    }).catch((e) => {
        console.error("ERROR", e);
        next(e);
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
