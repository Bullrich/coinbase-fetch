import axios from "axios";
import type { Account, UserTransactions } from "../config/coinbaseTypes";

const apiUrl = process.env.backendUrl != "undefined" ? process.env.backendUrl : "";
console.log(apiUrl);

export async function fetchUser():Promise<{name:string, id:string}> {
    const accounts = await axios.get(`${apiUrl}/user`);
    return accounts.data;
}

export async function fetchAccounts():Promise<Account[]> {
    const accounts = await axios.get(`${apiUrl}/accounts`);
    return accounts.data;
}

export async function fetchAccountTransactions(account:string): Promise<UserTransactions> {
    const data =  await axios.get(`${apiUrl}/collection/${account}`);
    return data.data;
}
