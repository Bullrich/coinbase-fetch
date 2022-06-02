import { coinbaseRequest } from "./request";
import {Account} from "./types";

export class CoinbaseApi {
    public async getAccounts(): Promise<Account[]> {
        const data = await coinbaseRequest("/v2/accounts");
        return data.data.data;
    }

    public async getTransactions(account:string) {
        const data = await coinbaseRequest(`/v2/accounts/${account}/transactions`);
        return data.data.data;
    }
}
