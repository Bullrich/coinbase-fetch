import { coinbaseRequest } from "./request";

export class CoinbaseApi {
    private userId: string | undefined;

    private async getUserId(): Promise<string> {
        if (this.userId) {
            return Promise.resolve(this.userId);
        }

        const user = await this.getUser();
        this.userId = user.id;
        console.log("fetch user", { id: user.id, name: user.name });
        return this.userId;
    }

    public async getUser(): Promise<{ id: string, name: string }> {
        const data = await coinbaseRequest("/v2/user");
        return data.data.data;
    }

    public async getTransactions() {
        const id = await this.getUserId();
        const data = await coinbaseRequest(`/v2/accounts/${id}/transactions`);
        return data.data;
    }
}
