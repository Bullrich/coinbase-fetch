import axios from "axios";
import type { Account } from "../config/coinbaseTypes";

const apiUrl = process.env.backendUrl || "";
console.log(apiUrl);

export async function fetchAccounts():Promise<Account[]> {
    const accounts = await axios.get(`${apiUrl}/accounts`);
    return accounts.data;
}
