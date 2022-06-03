import { coinbaseRequest } from "./request";
import { Account, Operation, Transaction, UserTransactions } from "./types";

export class CoinbaseApi {
    public async getAccounts(): Promise<Account[]> {
        const data = await coinbaseRequest("/v2/accounts");
        return data.data.data;
    }

    public async getUser(): Promise<{name:string, id:string}> {
        const data = await coinbaseRequest("/v2/user");
        return data.data.data;
    }

    public async getTransactions(account:string) : Promise<Transaction[]> {
        const data = await coinbaseRequest(`/v2/accounts/${account}/transactions`);
        return data.data.data;
    }

    public async getAccountTransactions(account:string) : Promise<UserTransactions> {
        const transactions = {
            buys: await this.getBuys(account),
            sells: await this.getSells(account),
            withdrawals: await this.getWithdrawals(account),
            deposits: await this.getDeposits(account),
            transactions: await this.getTransactions(account)
        };

        return transactions;
    }

    public async getWithdrawals(account:string) : Promise<Operation[]> {
        const data = await coinbaseRequest(`/v2/accounts/${account}/withdrawals`);
        return data.data.data;
    }

    public async getDeposits(account:string) : Promise<Operation[]> {
        const data = await coinbaseRequest(`/v2/accounts/${account}/deposits`);
        return data.data.data;
    }

    public async getBuys(account:string) : Promise<Operation[]> {
        const data = await coinbaseRequest(`/v2/accounts/${account}/buys`);
        return data.data.data;
    }

    public async getSells(account:string) : Promise<Operation[]> {
        const data = await coinbaseRequest(`/v2/accounts/${account}/sells`);
        return data.data.data;
    }
}
