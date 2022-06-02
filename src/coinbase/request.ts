import axios from "axios";
import crypto from "crypto";
import credentials from "../config";

export const coinbaseRequest = async (path:string) => {
    const {key, secret} = credentials;

    //get unix time in seconds
    const timestamp = Math.floor(Date.now() / 1000);

    // set the parameter for the request message
    const req = {
        method: "GET",
        path,
        body: ""
    };

    const message = timestamp + req.method + req.path + req.body;
    console.log(message);

    //create a hexedecimal encoded SHA256 signature of the message
    const signature = crypto.createHmac("sha256", secret).update(message).digest("hex");

    const config = {
        headers: {
            "CB-ACCESS-SIGN": signature,
            "CB-ACCESS-TIMESTAMP": timestamp,
            "CB-ACCESS-KEY": key,
            "CB-VERSION": "2015-07-22"
        }
    };

    return axios.get(`https://api.coinbase.com${path}`, config);
}
